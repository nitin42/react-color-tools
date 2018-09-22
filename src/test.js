import React from 'react'
import ReactDOM from 'react-dom'
import { css } from 'emotion'

import { BasicPicker, GradientPicker } from './index'

class WithoutTools extends React.Component {
  state = {
    color: 'hotpink'
  }

  render() {
    const { color } = this.state

    return (
      <div style={{ marginTop: 20 }}>
        <BasicPicker
          color={color}
          showTools
          onChange={color => this.setState({ color })}
        />
        <h1 style={{ color }}>React Color Tools</h1>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    color: 'hotpink',
    gradient: ''
  }

  render() {
    return <WithoutTools />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
