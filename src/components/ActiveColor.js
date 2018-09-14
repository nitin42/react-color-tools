import React from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'

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

ActiveColor.propTypes = {
  color: PropTypes.string.isRequired
}

export default ActiveColor
