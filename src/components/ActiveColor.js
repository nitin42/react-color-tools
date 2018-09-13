import React from 'react'
import { css } from 'emotion'

import { getContrastingColor } from '../utils/colors'

// Display the hex code for the currently selected color
const ActiveColor = ({ color }) => (
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
)

export default ActiveColor
