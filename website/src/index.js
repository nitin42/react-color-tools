import React from 'react'
import { render } from 'react-dom'

import { BasicPicker } from 'react-color-tools'

class App extends React.Component {
  state = { color: 'hotpink' }
  render() {
    return (
      <div>
        <BasicPicker
          color={this.state.color}
          onChange={color => this.setState({ color })}
        />
        <h1 style={{ color: this.state.color }}>Colors</h1>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
