import React from 'react'
import { GradientPicker } from 'react-color-tools'

class App extends React.Component {
  state = { gradient: '' }

  render() {
    const { gradient: grad } = this.state

    return (
      <div>
        <GradientPicker getGradient={gradient => this.setState({ gradient })} />
        <h1
          style={{
            'background-image': grad,
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent'
          }}
        >
          React Gradient Picker
        </h1>
      </div>
    )
  }
}

// With gradient mode and direction
class WithGradientMode extends React.Component {
  state = { gradient: '' }

  render() {
    const { gradient: grad } = this.state

    return (
      <div>
        <GradientPicker
          mode="linear"
          direction="to right"
          getGradient={gradient => this.setState({ gradient })}
        />
        <h1
          style={{
            'background-image': grad,
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent'
          }}
        >
          React Gradient Picker
        </h1>
      </div>
    )
  }
}
