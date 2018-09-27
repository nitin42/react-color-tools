import React from 'react'
import { SchemePicker } from 'react-color-tools'

class App extends React.Component {
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
