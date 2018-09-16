import React from 'react'
import ReactDOM from 'react-dom'

import BasicPicker from './pickers/BasicPicker'
import GradientPicker from './pickers/GradientPicker'
import { css } from 'emotion'

/* eslint-disable */
class App extends React.Component {
  state = {
    color: '#f00',
    gradient: ''
  }

  render() {
    return (
      <div>
        <GradientPicker getGradient={gradient => this.setState({ gradient })} />
        {/* <BasicPicker
          // color={this.state.color}
          // onChange={color => {
          //   this.setState({ color })
          // }}
          // onSwatchHover={color => this.setState({ color })}
          theme="light"
          showTools
          // triangle={false}
        /> */}
        <h2
          className={css`
            background: ${this.state.gradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          React Gradient Picker
        </h2>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
