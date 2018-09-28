import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

import { GradientPicker } from '../src'

class App extends React.Component {
  state = { gradient: '' }

  render() {
    const { gradient: grad } = this.state

    return (
      <div>
        <GradientPicker
          mode={this.props.mode}
          direction={this.props.direction}
          getGradient={gradient => this.setState({ gradient })}
        />
        <h1
          style={{
            backgroundImage: grad,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          React Gradient Picker
        </h1>
      </div>
    )
  }
}

describe('Test GradientPicker API', () => {
  it('should render the gradient picker', () => {
    const tree = renderer.create(<GradientPicker />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render the gradient picker with dark theme', () => {
    const tree = renderer.create(<GradientPicker theme="dark" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should update the state of parent component', () => {
    const Wrapper = mount(<App />)

    expect(Wrapper.state('gradient')).toEqual(
      'linear-gradient(to top, rgb(129, 255, 239) 0%, rgb(240, 103, 180) 100%)'
    )
  })

  it('should create gradient with mode and direction prop', () => {
    const Wrapper = mount(<App mode="linear" direction="to left" />)
    expect(Wrapper.state('gradient')).toEqual(
      'linear-gradient(to left, rgb(129, 255, 239) 0%, rgb(240, 103, 180) 100%)'
    )
  })

  it('should create new gradient based when color input changes', () => {
    const Wrapper = mount(<App />)

    expect(Wrapper.state('gradient')).toEqual(
      'linear-gradient(to top, rgb(129, 255, 239) 0%, rgb(240, 103, 180) 100%)'
    )

    Wrapper.find('ColorInputField').forEach((node, i) => {
      if (i === 1) {
        node.simulate('change', { target: { value: 'red' } })
      } else {
        node.simulate('change', { target: { value: 'orange' } })
      }
    })

    expect(Wrapper.state('gradient')).toEqual(
      'linear-gradient(to top, rgb(255, 165, 0) 0%, rgb(255, 0, 0) 100%)'
    )
  })

  it('should update the gradient when color stop position changes', () => {
    const Wrapper = mount(<App />)

    Wrapper.find('Slider').forEach((node, i) => {
      if (i === 1) {
        node.simulate('change', { target: { value: '8' } })
      } else {
        node.simulate('change', { target: { value: '4' } })
      }
    })

    expect(Wrapper.state('gradient')).toEqual(
      'linear-gradient(to top, rgb(129, 255, 239) 0%, rgb(129, 255, 239) 20%, rgb(240, 103, 180) 80%, rgb(240, 103, 180) 100%)'
    )
  })
})
