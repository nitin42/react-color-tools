import React from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'

// Displays a color block with the active color hex code
const ColorBlock = ({ color, children }) => (
  <div
    className={css`
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 110px;
      border-radius: 6px 6px 0px 0px;
    `}
    style={{ background: color }}
  >
    {children}
  </div>
)

ColorBlock.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default ColorBlock
