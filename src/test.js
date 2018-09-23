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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BasicPicker
          color={color}
          showTools
          onChange={color => this.setState({ color })}
        />
        <h1 style={{ color, marginTop: 310, marginLeft: 20, fontSize: 20 }}>
          React Color Tools
        </h1>
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
