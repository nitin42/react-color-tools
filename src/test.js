import React from 'react'
import ReactDOM from 'react-dom'
import { css } from 'emotion'

import { BasicPicker, GradientPicker } from './index'

class App extends React.Component {
  state = { gradient: '' }

  render() {
    const { gradient: grad } = this.state

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <GradientPicker
          theme="light"
          mode="linear"
          direction="to bottom"
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

ReactDOM.render(<App />, document.getElementById('root'))
