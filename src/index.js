import React from 'react'
import ReactDOM from 'react-dom'

import { css } from 'emotion'
import BasicPicker from './pickers/BasicPicker'
import GradientPicker from './pickers/GradientPicker'

const DEFAULT_COLOR_ONE = '#81FFEF'
const DEFAULT_COLOR_TWO = '#F067B4'

const PickerBasic = props => <BasicPicker {...props} />

const PickerGradient = props => <GradientPicker {...props} />

/* eslint-disable */
class App extends React.Component {
  state = {
    color: 'hotpink',
    gradient: ''
  }

  render() {
    return (
      <div>
        {/* <PickerBasic
					color={this.state.color}
					onChange={color => {
						this.setState({ color })
					}}
					showTools
					swatches={['red', 'green']}
					triangle={false}
				/> */}
        <PickerGradient
          theme="dark"
          getGradient={gradient => this.setState({ gradient })}
        />
        <h1
          className={css`
            display: inline-block;
            background: ${this.state.gradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          Introduction
        </h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
