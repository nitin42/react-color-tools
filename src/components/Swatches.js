import React from 'react'
import { css } from 'emotion'

import Swatch from './Swatch'

const ENTER_KEY = 13

const Swatches = ({ swatches, updateSwatch, onSwatchHover }) => (
  <div
    className={css`
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 5.3px;
    `}
  >
    {swatches.map((color, key) => (
      <span key={key}>
        <Swatch
          value={color}
          updateSwatch={e => updateSwatch(color, e)}
          updateSwatchOnKeyDown={e =>
            e.keyCode === ENTER_KEY ? updateSwatch(color, e) : null
          }
          onSwatchHover={e => onSwatchHover && onSwatchHover(color, e)}
        />
      </span>
    ))}
    <div style={{ clear: 'both' }} />
  </div>
)

export default Swatches
