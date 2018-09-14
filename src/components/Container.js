import React from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'

// Main color picker container
const Container = ({ children, width, background }) => (
  <div
    className={css`
      width: ${width};
      background: ${background};
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px;
      border-radius: 6px;
      position: relative;
    `}
  >
    {children}
  </div>
)

Container.defaultProps = {
  width: '222px',
  background: 'rgb(255, 255, 255)'
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  background: PropTypes.string
}

export default Container
