import React from 'react'
import { Consumer } from '../utils/context'

const ShadesGenerator = ({ generateShades }) => (
  <Consumer>
    {color => (
      <span title="shade picker" onClick={generateShades}>
        <i id="image-icon" className="fas fa-adjust" style={{ color }} />
      </span>
    )}
  </Consumer>
)

export default ShadesGenerator
