import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { SchemePicker } from '../src'

class App extends React.Component {
  state = { color: 'hotpink' }

  render() {
    return (
      <React.Fragment>
        <h1 style={{ color: this.state.color }}>React Color Tools</h1>
        <SchemePicker
          theme={this.props.theme}
          scheme={this.props.scheme}
          color={this.state.color}
          onChange={color => this.setState({ color })}
        />
      </React.Fragment>
    )
  }
}

describe('Test SchemePicker API', () => {
  it('should render the scheme picker', () => {
    const tree = renderer.create(<SchemePicker />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the picker with dark theme', () => {
    const tree = renderer.create(<SchemePicker theme="dark" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should update the state of parent component when a swatch is clicked', () => {
    const Wrapper = mount(<App />)
    expect(Wrapper.state('color')).toEqual('hotpink')

    Wrapper.find('Swatch').forEach((node, i) => {
      // Select a random swatch and fire click event
      if (i === 4) {
        node.simulate('click')
      }
    })

    expect(Wrapper.state('color')).toEqual('#d45896')
  })

  it('should update the color state when passed a new color scheme', () => {
    const Wrapper = mount(<App scheme="analogous" />)
    const instance = Wrapper.instance()

    expect(Wrapper.state('color')).toEqual('hotpink')

    Wrapper.find('Swatch').forEach((node, i) => {
      // Select a random swatch and fire click event
      if (i === 7) {
        node.simulate('click')
      }
    })

    expect(Wrapper.state('color')).toEqual('#fff069')
  })
})
