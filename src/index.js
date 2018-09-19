/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'

import { css } from 'emotion'
import BasicPicker from './pickers/BasicPicker'
import GradientPicker from './pickers/GradientPicker'
import SchemePicker from './pickers/SchemePicker'

const DEFAULT_COLOR_ONE = '#81FFEF'
const DEFAULT_COLOR_TWO = '#F067B4'

const PickerBasic = props => <BasicPicker {...props} />

const PickerGradient = props => <GradientPicker {...props} />

const directions = {
  one: 'farthest-corner ellipse at top left',
  two: 'ellipse at center',
  three: 'at top-left',
  four: 'at right'
}

/* eslint-disable */
class App extends React.Component {
  state = {
    color: 'hotpink',
    gradient: ''
  }

  render() {
    return (
      <div>
        <SchemePicker
          color={this.state.color}
          onChange={color => {
            this.setState({ color })
          }}
        />
        <h1 style={{ color: this.state.color }}>SCHEME PICKER</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
