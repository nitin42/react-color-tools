import React from 'react'
import ReactDOM from 'react-dom'
import { css } from 'emotion'

import { BasicPicker, GradientPicker, SchemePicker } from './index'

class App extends React.Component {
  state = { gradient: '', color: 'hotpink' }

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
          theme="dark"
          scheme="analogous"
          color={this.state.color}
          onChange={color => this.setState({ color })}
        />
        <GradientPicker />
        <BasicPicker />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
