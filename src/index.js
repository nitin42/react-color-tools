import React from 'react'
import ReactDOM from 'react-dom'

import BasicPicker from './pickers/BasicPicker'

/* eslint-disable */
class App extends React.Component {
  state = {
    color: '#f00'
  }

  render() {
    return (
      <div>
        <BasicPicker
          // color={this.state.color}
          // onChange={color => {
          //   this.setState({ color })
          // }}
          // onSwatchHover={color => this.setState({ color })}
          theme="light"
          showTools
          // triangle={false}
        />
        {/* <h2 style={{ color: this.state.color }}>React Color Picker</h2> */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
