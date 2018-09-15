import React from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'

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
    {swatches.map(color => (
      <Swatch
        key={color}
        color={color}
        updateSwatch={() => updateSwatch(color)}
        updateSwatchOnKeyDown={e =>
          /* eslint-disable no-unused-vars */
          e.keyCode === ENTER_KEY ? updateSwatch(color) : null
        }
        onSwatchHover={() => onSwatchHover && onSwatchHover(color)}
      />
    ))}
  </div>
)

Swatches.defaultProps = {
  updateSwatch: () => {},
  onSwatchHover: () => {}
}

Swatches.propTypes = {
  swatches: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateSwatch: PropTypes.func,
  onSwatchHover: PropTypes.func
}

export default Swatches
