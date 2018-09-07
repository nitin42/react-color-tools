import React from 'react'
import { Consumer } from '../utils/context'

const Reset = ({ resetColors }) => (
  <Consumer>
    {color => (
      <span title="reset picker" onClick={resetColors}>
        <i
          id="image-icon"
          className="fas fa-arrow-alt-circle-left"
          style={{ color }}
        />
      </span>
    )}
  </Consumer>
)

export default Reset
