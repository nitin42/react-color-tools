import React from 'react'
import { Consumer } from '../utils/context'

const Clipboard = ({ copyColor }) => (
  <Consumer>
    {color => (
      <span title="clipboard" onClick={copyColor}>
        <i id="image-icon" className="fas fa-copy" style={{ color }} />
      </span>
    )}
  </Consumer>
)

export default Clipboard
