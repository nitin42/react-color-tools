import React from 'react'
import { css } from 'emotion'

import { getContrastingColor } from '../utils/colors'

// Display the hex code for the currently selected color
const ActiveColor = ({ color }) => (
  <div
    className={css`
      font-size: 18px;
      color: ${getContrastingColor(color)};
      position: relative;
    `}
  >
    {color}
  </div>
)

export default ActiveColor
