/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'

import { css } from 'emotion'
import BasicPicker from './pickers/BasicPicker'
import GradientPicker from './pickers/GradientPicker'

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
        <h1 style={{ color: this.state.color }}>Color Picker Components</h1>
        <BasicPicker showTools />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
