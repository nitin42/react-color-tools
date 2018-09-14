import React from 'react'
import PropTypes from 'prop-types'

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

const ImagePicker = HOC(({ color, uploadImage }) => (
  <span title="Image picker">
    <input
      id="uploader"
      style={{ display: 'none' }}
      type="file"
      accept="image/*"
      onChange={uploadImage}
    />
    <i id="image-icon" className="fas fa-image" style={{ color }} />
  </span>
))

ImagePicker.propTypes = {
  color: PropTypes.string,
  uploadImage: PropTypes.func
}

const PaletteGenerator = HOC(({ color, generateSwatches }) => (
  <span title="Palette generator" onClick={generateSwatches}>
    <i id="image-icon" className="fas fa-palette" style={{ color }} />
  </span>
))

PaletteGenerator.propTypes = {
  color: PropTypes.string,
  generateSwatches: PropTypes.func
}

const ShadesGenerator = HOC(({ color, generateShades }) => (
  <span title="shade picker" onClick={generateShades}>
    <i id="image-icon" className="fas fa-adjust" style={{ color }} />
  </span>
))

ShadesGenerator.propTypes = {
  color: PropTypes.string,
  generateShades: PropTypes.func
}

const Reset = HOC(({ color, resetColors }) => (
  <span title="reset colors" onClick={resetColors}>
    <i
      id="image-icon"
      className="fas fa-arrow-alt-circle-left"
      style={{ color }}
    />
  </span>
))

Reset.propTypes = {
  color: PropTypes.string,
  resetColors: PropTypes.func
}

const TintsGenerator = HOC(({ color, generateTints }) => (
  <span title="tint picker" onClick={generateTints}>
    <i id="image-icon" className="fas fa-tint" style={{ color }} />
  </span>
))

TintsGenerator.propTypes = {
  color: PropTypes.string,
  generateTints: PropTypes.func
}

const Clipboard = HOC(({ color, copyColor }) => (
  <span title="clipboard" onClick={copyColor}>
    <i id="image-icon" className="fas fa-copy" style={{ color }} />
  </span>
))

Clipboard.propTypes = {
  color: PropTypes.string,
  copyColor: PropTypes.func
}

const AdvanceTools = {
  ColorSaturator,
  ColorDesaturator,
  ColorLightener,
  ColorBrightener,
  ColorDarkener,
  ColorSpinner
}

Object.keys(AdvanceTools).forEach(tool => {
  AdvanceTools[tool].propTypes = {
    color: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func
  }
})

const BasicTools = {
  TintsGenerator,
  ShadesGenerator,
  Reset,
  ImagePicker,
  PaletteGenerator,
  Clipboard
}

export { AdvanceTools, BasicTools }
