import React from 'react'
import Slider from './Slider'
import { Consumer } from '../utils/context'

const HOC = Comp => props => (
  <Consumer>{color => <Comp color={color} {...props} />}</Consumer>
)

const ColorSaturator = HOC(({ color, value, onChange }) => (
  <span title="color saturator">
    <i className="fas fa-star-half-alt icon" style={{ color }} />
    <Slider
      min="10"
      max="100"
      value={value}
      onChange={onChange}
      color={color}
    />
    <label className="values" style={{ color }}>
      {value}
    </label>
  </span>
))

const ColorDesaturator = HOC(({ color, value, onChange }) => (
  <span title="color desaturator">
    <i className="fas fa-fill icon" style={{ color }} />
    <Slider
      min="10"
      max="100"
      value={value}
      onChange={onChange}
      color={color}
    />
    <label className="values" style={{ color }}>
      {value}
    </label>
  </span>
))

const ColorLightener = HOC(({ color, value, onChange }) => (
  <span title="color lightener">
    <i className="far fa-moon icon" style={{ color }} />
    <Slider
      min="10"
      max="100"
      value={value}
      onChange={onChange}
      color={color}
    />
    <label className="values" style={{ color }}>
      {value}
    </label>
  </span>
))

const ColorBrightener = HOC(({ color, value, onChange }) => (
  <span title="color brightener">
    <i className="fas fa-sun icon" style={{ color }} />
    <Slider
      min="10"
      max="100"
      value={value}
      onChange={onChange}
      color={color}
    />
    <label className="values" style={{ color }}>
      {value}
    </label>
  </span>
))

const ColorDarkener = HOC(({ color, value, onChange }) => (
  <span title="color darkener">
    <i className="fas fa-moon icon" style={{ color }} />
    <Slider
      min="10"
      max="100"
      value={value}
      onChange={onChange}
      color={color}
    />
    <label className="values" style={{ color }}>
      {value}
    </label>
  </span>
))

const ColorSpinner = HOC(({ color, onChange, value }) => (
  <span title="color spin">
    <i className="fas fa-sync-alt icon" style={{ color }} />
    <Slider
      min="-360"
      max="360"
      value={value}
      onChange={onChange}
      color={color}
    />
    <label className="values" style={{ color }}>
      {value}
      <sup>&deg;</sup>
    </label>
  </span>
))

const Tools = {
  ColorSaturator,
  ColorDesaturator,
  ColorLightener,
  ColorBrightener,
  ColorDarkener,
  ColorSpinner
}

export default Tools
