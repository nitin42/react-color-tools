import React from 'react'
import ReactDOM from 'react-dom'
import { css } from 'emotion'

import { BasicPicker, GradientPicker } from './index'

class App extends React.Component {
  state = {
    color: 'hotpink',
    gradient: ''
  }

  render() {
    return (
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-top: 30px;
        `}
      >
        <GradientPicker
          theme="light"
          mode="linear"
          direction="to top"
          reverse
          getGradient={gradient => this.setState({ gradient })}
        />
        <h1
          className={css`
            background-image: ${this.state.gradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          React Color Tools
        </h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
