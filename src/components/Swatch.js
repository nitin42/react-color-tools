import React from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'

const Swatch = ({
  color,
  updateSwatch,
  onSwatchHover,
  updateSwatchOnKeyDown
}) => (
  <div
    role="swatch"
    className={css`
      background: ${color};
      height: 22px;
      width: 22px;
      cursor: pointer;
      position: relative;
      outline: none;
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      &:focus {
        box-shadow: ${color} 0px 0px 4px;
      }
    `}
    title={color}
    onClick={updateSwatch}
    onKeyDown={updateSwatchOnKeyDown}
    onMouseOver={onSwatchHover}
    onFocus={onSwatchHover}
    tabIndex={0}
  />
)

Swatch.defaultProps = {
  updateSwatch: () => {},
  onSwatchHover: () => {},
  updateSwatchOnKeyDown: () => {}
}

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
  updateSwatch: PropTypes.func,
  onSwatchHover: PropTypes.func,
  updateSwatchOnKeyDown: PropTypes.func
}

export default Swatch
