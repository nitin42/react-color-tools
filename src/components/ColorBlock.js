import React from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'

import { getContrastingColor } from '../utils/colors'

// Displays a color block with the active color hex code
const ColorBlock = ({ currentFormat, colorState, color }) => (
  <div
    className={css`
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 110px;
      border-radius: 6px 6px 0px 0px;
    `}
    style={{
      background: currentFormat === 'HSV' ? colorState.toHexString() : color
    }}
  >
    <div
      className={css`
        font-size: 18px;
        position: relative;
      `}
      style={{
        color: getContrastingColor(color)
      }}
    >
      {color}
    </div>
  </div>
)

ColorBlock.defaultProps = {
  currentFormat: 'HEX'
}

ColorBlock.propTypes = {
  color: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  colorState: PropTypes.object.isRequired,
  currentFormat: PropTypes.string
}

export default ColorBlock
