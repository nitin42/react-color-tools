import React from 'react'
import { css } from 'emotion'

// Main color picker container
const Container = ({ children, width, background }) => (
  <div
    className={css`
      width: ${width || '222px'};
      background: ${background || 'rgb(255, 255, 255)'};
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px;
      border-radius: 6px;
      position: relative;
    `}
    width={width}
    background={background}
  >
    {children}
  </div>
)

export default Container
