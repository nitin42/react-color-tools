import React from 'react'
import { BasicColorPicker } from 'react-color-tools'

// Without color tools
class WithoutTools extends React.Component {
  state = {
    color: 'hotpink'
  }

  render() {
    const { color } = this.state

    return (
      <div>
        <BasicColorPicker
          color={color}
          onChange={color => this.setState({ color })}
          theme="dark"
        />
        <h1 style={{ color }}>React Color Tools</h1>
      </div>
    )
  }
}

// With colors tools
class WithTools extends React.Component {
  state = {
    color: 'hotpink'
  }

  render() {
    const { color } = this.state

    return (
      <div>
        <BasicColorPicker
          color={color}
          onChange={color => this.setState({ color })}
          showTools={true}
        />
        <h1 style={{ color }}>React Color Tools</h1>
      </div>
    )
  }
}
