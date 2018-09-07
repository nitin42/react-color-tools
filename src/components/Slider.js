import React from 'react'
import { css } from 'emotion'

const Slider = ({ min, max, value, onChange, color }) => (
  <input
    className={css`
      -webkit-appearance: none;
      width: 140px;
      height: 2px;
      border-radius: 5px;
      background: #dcdcdc;
      outline: none;
      opacity: 0.7;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;

      ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        cursor: pointer;
        background: ${color};
      }
    `}
    type="range"
    min={min}
    max={max}
    value={value}
    onChange={onChange}
  />
)

export default Slider
