import React from 'react'
import { Consumer } from '../utils/context'

const PaletteGenerator = ({ generateSwatches }) => (
  <Consumer>
    {color => (
      <span title="Palette generator" onClick={generateSwatches}>
        <i id="image-icon" className="fas fa-palette" style={{ color }} />
      </span>
    )}
  </Consumer>
)

export default PaletteGenerator
