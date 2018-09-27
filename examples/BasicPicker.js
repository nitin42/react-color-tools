import React from 'react'
import { BasicPicker } from 'react-color-tools'

class App extends React.Component {
  state = {
    color: 'hotpink'
  }

  render() {
    const { color } = this.state

    return (
      <div>
        <BasicPicker
          color={color}
          onChange={color => this.setState({ color })}
          theme="dark"
          showTools={true}
        />
        <h1 style={{ color }}>React Color Tools</h1>
      </div>
    )
  }
}
