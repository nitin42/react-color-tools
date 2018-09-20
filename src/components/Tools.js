import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

import Slider from './Slider'
import { Consumer } from '../utils/context'

const StyledIcon = styled('i')`
  display: inline-block;
  width: 20px;
  position: relative;
  top: 5px;
  left: -5px;
  color: ${props => props.color};
`

const StyledSpan = styled('span')`
  outline: none;
`

const ToolsIcon = styled('i')`
  cursor: pointer;
  color: ${props => props.color};
`

const StyledLabel = styled('label')`
  display: inline-block;
  width: 10px;
  position: relative;
  top: 3px;
  left: 4px;
  color: ${props => props.color};
`

const ENTER_KEY = 13

/* eslint-disable operator-linebreak */
const TOOLTIP_CLASSNAME =
  'tooltipped tooltipped-ne tooltipped-align-left-1 tooltipped-no-delay border p-2 mb-2 mr-2 float-left'

const HOC = Comp => props => (
  <Consumer>{color => <Comp color={color} {...props} />}</Consumer>
)

const ColorSaturator = HOC(({ color, value, onChange }) => (
  <StyledSpan title="color saturator">
    <StyledIcon className="fas fa-star-half-alt" color={color} />
    <Slider
      min="10"
      max="100"
      value={value}
      onChange={onChange}
      color={color}
    />
    <StyledLabel color={color}>{value}</StyledLabel>
  </StyledSpan>
))

const ColorDesaturator = HOC(({ color, value, onChange }) => (
  <StyledSpan title="color desaturator">
    <StyledIcon className="fas fa-fill" color={color} />
    <Slider
      min="10"
      max="100"
      value={value}
      onChange={onChange}
      color={color}
    />
    <StyledLabel color={color}>{value}</StyledLabel>
  </StyledSpan>
))

const ColorBrightener = HOC(({ color, value, onChange }) => (
  <StyledSpan title="color brightener">
    <StyledIcon className="fas fa-sun" color={color} />
    <Slider
      min="10"
      max="100"
      value={value}
      onChange={onChange}
      color={color}
    />
    <StyledLabel color={color}>{value}</StyledLabel>
  </StyledSpan>
))

const ColorDarkener = HOC(({ color, value, onChange }) => (
  <StyledSpan title="color darkener">
    <StyledIcon className="fas fa-moon" color={color} />
    <Slider
      min="10"
      max="100"
      value={value}
      onChange={onChange}
      color={color}
    />
    <StyledLabel color={color}>{value}</StyledLabel>
  </StyledSpan>
))

const ColorSpinner = HOC(({ color, onChange, value }) => (
  <StyledSpan title="color spin">
    <StyledIcon className="fas fa-sync-alt" color={color} />
    <Slider
      min="-360"
      max="360"
      value={value}
      onChange={onChange}
      color={color}
    />
    <StyledLabel color={color}>
      {value}
      <sup>&deg;</sup>
    </StyledLabel>
  </StyledSpan>
))

const ImagePicker = HOC(({ color, uploadImage }) => (
  <StyledSpan title="Image picker">
    <input
      id="uploader"
      style={{ display: 'none' }}
      type="file"
      accept="image/*"
      onChange={uploadImage}
    />
    <ToolsIcon id="image-icon" className="fas fa-image" color={color} />
  </StyledSpan>
))

ImagePicker.propTypes = {
  color: PropTypes.string,
  uploadImage: PropTypes.func
}

const PaletteGenerator = HOC(({ color, generateSwatches }) => (
  <StyledSpan
    tabIndex={0}
    title="Palette generator"
    onClick={generateSwatches}
    onKeyDown={e => (e.keyCode === ENTER_KEY ? generateSwatches(e) : null)}
  >
    <ToolsIcon id="image-icon" className="fas fa-palette" color={color} />
  </StyledSpan>
))

PaletteGenerator.propTypes = {
  color: PropTypes.string,
  generateSwatches: PropTypes.func
}

const ShadesGenerator = HOC(({ color, generateShades }) => (
  <StyledSpan
    tabIndex={0}
    title="shade picker"
    onClick={generateShades}
    onKeyDown={e => (e.keyCode === ENTER_KEY ? generateShades(e) : null)}
  >
    <ToolsIcon id="image-icon" className="fas fa-adjust" color={color} />
  </StyledSpan>
))

ShadesGenerator.propTypes = {
  color: PropTypes.string,
  generateShades: PropTypes.func
}

const Reset = HOC(({ color, resetColors }) => (
  <StyledSpan
    tabIndex={0}
    title="reset colors"
    onClick={resetColors}
    onKeyDown={e => (e.keyCode === ENTER_KEY ? resetColors(e) : null)}
  >
    <ToolsIcon
      id="image-icon"
      className="fas fa-arrow-alt-circle-left"
      color={color}
    />
  </StyledSpan>
))

Reset.propTypes = {
  color: PropTypes.string,
  resetColors: PropTypes.func
}

const TintsGenerator = HOC(({ color, generateTints }) => (
  <StyledSpan
    tabIndex={0}
    title="tint picker"
    onClick={generateTints}
    onKeyDown={e => (e.keyCode === ENTER_KEY ? generateTints(e) : null)}
  >
    <ToolsIcon id="image-icon" className="fas fa-tint" color={color} />
  </StyledSpan>
))

TintsGenerator.propTypes = {
  color: PropTypes.string,
  generateTints: PropTypes.func
}

const Clipboard = HOC(({ color, copyColor, showMsg, id = 'clipboard' }) => (
  <StyledSpan
    tabIndex={0}
    id={id}
    onClick={copyColor}
    onKeyDown={e => (e.keyCode === ENTER_KEY ? copyColor(e) : null)}
    className={showMsg ? TOOLTIP_CLASSNAME : 'no-tooltip'}
    aria-label="Copied"
  >
    <ToolsIcon id="image-icon" className="fas fa-copy" color={color} />
  </StyledSpan>
))

Clipboard.propTypes = {
  color: PropTypes.string,
  copyColor: PropTypes.func
}

const GradientGenerator = HOC(({ color, generateGradient }) => (
  <StyledSpan
    tabIndex={0}
    onClick={generateGradient}
    title="Gradient generator"
    onKeyDown={e => (e.keyCode === ENTER_KEY ? generateGradient(e) : null)}
  >
    <ToolsIcon className="fas fa-redo-alt" color={color} />
  </StyledSpan>
))

GradientGenerator.propTypes = {
  color: PropTypes.string,
  generateGradient: PropTypes.func
}

const AdvanceTools = {
  ColorSaturator,
  ColorDesaturator,
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
  Clipboard,
  GradientGenerator
}

export { AdvanceTools, BasicTools }
