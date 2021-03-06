import React from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'

const Triangle = ({ color }) => (
  <div
    className={css`
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 0 10px 10px 10px;
      border-color: transparent transparent ${color} transparent;
      position: absolute;
      top: -10px;
      left: 50%;
      margin-left: -10px;
    `}
  />
)

Triangle.propTypes = {
  color: PropTypes.string.isRequired
}

export default Triangle
