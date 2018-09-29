import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { BasicPicker } from '../src'

const DEFAULT_SWATCHES = [
  '#5a80b4',
  '#40e0d0',
  '#088da5',
  '#f6546a',
  '#cac8a0',
  '#0079cf',
  '#ffa6ca',
  '#03ec13',
  '#3999dc',
  '#e1c9ec',
  '#2f9d66',
  '#daa520'
]
const PINK_TINTS = [
  '#ff78bc',
  '#ff87c3',
  '#ff96cb',
  '#ffa5d2',
  '#ffb4da',
  '#ffc3e1',
  '#ffd2e9',
  '#ffe1f0',
  '#fff0f8',
  '#ffffff'
]
const PINK_SHADES = [
  '#e65fa2',
  '#cc5490',
  '#b34a7e',
  '#993f6c',
  '#80355a',
  '#662a48',
  '#4d2036',
  '#331524',
  '#190a12',
  '#000000'
]

class App extends React.Component {
  state = { color: 'hotpink' }

  render() {
    return (
      <React.Fragment>
        <h1 style={{ color: this.state.color }}>React Color Tools</h1>
        <BasicPicker
          theme={this.props.theme}
          color={this.state.color}
          onChange={color => this.setState({ color })}
          showTools={this.props.showTools}
          triangle={this.props.triangle}
          maxColors={this.props.maxColors}
          onSwatchHover={color => this.setState({ color })}
          swatches={this.props.swatches}
        />
      </React.Fragment>
    )
  }
}

describe('Test BasicPicker API', () => {
  it('should render the basic picker', () => {
    const tree = renderer.create(<BasicPicker />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the basic picker with dark theme', () => {
    const tree = renderer.create(<BasicPicker theme="dark" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the advance tools', () => {
    const tree = renderer.create(<BasicPicker showTools />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the picker with user defined swatches', () => {
    const tree = renderer
      .create(<BasicPicker swatches={['red', 'blue']} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the picker without triangle', () => {
    const tree = renderer.create(<BasicPicker triangle={false} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should update the color state when a swatch is clicked', () => {
    const Wrapper = mount(<App />)

    expect(Wrapper.state('color')).toEqual('hotpink')

    Wrapper.find('Swatch').forEach((node, i) => {
      if (i === 3) {
        node.simulate('click')
      }
    })

    expect(Wrapper.state('color')).toEqual('#f6546a')
  })

  it('should update the color state on hovering over a swatch', () => {
    const Wrapper = mount(<App />)
    expect(Wrapper.state('color')).toEqual('hotpink')

    Wrapper.find('Swatch').forEach((node, i) => {
      if (i === 8) {
        node.simulate('mouseover')
      }
    })

    expect(Wrapper.state('color')).toEqual('#3999dc')
  })

  it('should update the color when color input changes', () => {
    const Wrapper = mount(<App />)
    expect(Wrapper.state('color')).toEqual('hotpink')

    Wrapper.find('ColorInputField').simulate('change', {
      target: { value: 'mistyrose' }
    })

    expect(Wrapper.state('color')).toEqual('mistyrose')
  })

  it('should update the swatches when new swatches are generated', () => {
    const Wrapper = mount(<BasicPicker />)

    expect(Wrapper.state('swatches')).toEqual(DEFAULT_SWATCHES)
    Wrapper.find('SwatchesGenerator').simulate('click')

    // Swatches are generated randomly, so we cannot assume it to be equal to a constant value
    expect(Wrapper.state('swatches')).not.toEqual(DEFAULT_SWATCHES)
  })

  it('should generate tints of a color', () => {
    const Wrapper = mount(<BasicPicker color="hotpink" />)

    expect(Wrapper.state('tints')).toEqual([])

    Wrapper.find('TintsGenerator').simulate('click')

    expect(Wrapper.state('tints')).toEqual(PINK_TINTS)
  })

  it('should generate shades of a color', () => {
    const Wrapper = mount(<BasicPicker color="hotpink" />)

    expect(Wrapper.state('shades')).toEqual([])

    Wrapper.find('ShadesGenerator').simulate('click')

    expect(Wrapper.state('shades')).toEqual(PINK_SHADES)
  })

  it('should reset the picker state', () => {
    const Wrapper = mount(<BasicPicker color="hotpink" />)

    Wrapper.setState({ tints: PINK_TINTS })
    Wrapper.setState({ shades: PINK_SHADES })

    Wrapper.find('Reset').simulate('click')

    expect(Wrapper.state('tints')).toEqual([])
    expect(Wrapper.state('shades')).toEqual([])
  })

  it('should apply spin operation to a color', () => {
    const Wrapper = mount(<App showTools={true} />)

    expect(Wrapper.state('color')).toEqual('hotpink')

    Wrapper.find('ColorSpinner')
      .find('Slider')
      .simulate('change', { target: { value: '120' } })

    expect(Wrapper.state('color')).toEqual('#b4ff69')
  })

  it('should apply saturation operation to a color', () => {
    const Wrapper = mount(<App showTools={true} />)

    expect(Wrapper.state('color')).toEqual('hotpink')

    Wrapper.find('ColorSaturator')
      .find('Slider')
      .simulate('change', { target: { value: '2' } })

    expect(Wrapper.state('color')).toEqual('#ff69b4')
  })

  it('should apply desaturation operation to a color', () => {
    const Wrapper = mount(<App showTools={true} />)

    expect(Wrapper.state('color')).toEqual('hotpink')

    Wrapper.find('ColorDesaturator')
      .find('Slider')
      .simulate('change', { target: { value: '80' } })

    expect(Wrapper.state('color')).toEqual('#c3a5b4')
  })

  it('should apply dark operation to a color', () => {
    const Wrapper = mount(<App showTools={true} />)

    expect(Wrapper.state('color')).toEqual('hotpink')

    Wrapper.find('ColorDarkener')
      .find('Slider')
      .simulate('change', { target: { value: '40' } })

    expect(Wrapper.state('color')).toEqual('#9c004e')
  })

  it('should apply bright operation to a color', () => {
    const Wrapper = mount(<App showTools={true} />)

    expect(Wrapper.state('color')).toEqual('hotpink')

    Wrapper.find('ColorBrightener')
      .find('Slider')
      .simulate('change', { target: { value: '10' } })

    expect(Wrapper.state('color')).toEqual('#ff82cd')
  })
})
