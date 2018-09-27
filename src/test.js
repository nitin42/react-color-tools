import React from 'react'
import ReactDOM from 'react-dom'
import { css } from 'emotion'

import { BasicPicker, GradientPicker, SchemePicker } from './index'

class TestBasicPicker extends React.Component {
  state = {
    color: 'hotpink'
  }

  render() {
    const { color } = this.state

    return (
      <div>
        <BasicPicker
          color={color}
          onChange={c => this.setState({ color: c })}
        />
        <h1 style={{ color }}>Basic Color Picker</h1>
      </div>
    )
  }
}

class TestGradientPicker extends React.Component {
  state = {
    gradient: ''
  }

  render() {
    const { gradient } = this.state

    return (
      <div>
        <GradientPicker
          getGradient={grad => this.setState({ gradient: grad })}
        />
        <h1
          className={css`
            background-image: ${gradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          React Gradient Tools
        </h1>
      </div>
    )
  }
}

class TestSchemePicker extends React.Component {
  state = { color: 'hotpink' }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h1 style={{ color: this.state.color }}>React Color Tools</h1>
        <SchemePicker
          theme="light"
          scheme="analogous"
          color={this.state.color}
          onChange={color => this.setState({ color })}
        />
      </div>
    )
  }
}

ReactDOM.render(<TestSchemePicker />, document.getElementById('root'))
