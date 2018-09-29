import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

import Slider from './Slider'
import { Consumer } from '../utils/context'
import {
  SaturatorIcon,
  DesaturatorIcon,
  ColorSpinIcon,
  ColorDarkenerIcon,
  ColorBrightenerIcon,
  ImagePickerIcon,
  SwatchesGeneratorIcon,
  ShadesGeneratorIcon,
  ResetIcon,
  TintsGeneratorIcon,
  ClipboardIcon,
  GenerateGradientIcon
} from '../icons/index'

// Copied from primer/primer-tooltips/build
import '../styles/tooltip.css'

const StyledSpan = styled('span')`
  outline: none;
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
    <SaturatorIcon width={20} height={20} color={color} />
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

ColorSaturator.displayName = 'ColorSaturator'

const ColorDesaturator = HOC(({ color, value, onChange }) => (
  <StyledSpan title="color desaturator">
    <DesaturatorIcon width={20} height={20} color={color} />
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

ColorDesaturator.displayName = 'ColorDesaturator'

const ColorBrightener = HOC(({ color, value, onChange }) => (
  <StyledSpan title="color brightener">
    <ColorBrightenerIcon width={20} height={20} color={color} />
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

ColorBrightener.displayName = 'ColorBrightener'

const ColorDarkener = HOC(({ color, value, onChange }) => (
  <StyledSpan title="color darkener">
    <ColorDarkenerIcon width={16} height={16} color={color} />
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

ColorDarkener.displayName = 'ColorDarkener'

const ColorSpinner = HOC(({ color, onChange, value }) => (
  <StyledSpan title="color spin">
    <ColorSpinIcon width={18} height={18} color={color} />
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

ColorSpinner.displayName = 'ColorSpinner'

const ImagePicker = HOC(({ color, uploadImage }) => (
  <StyledSpan title="Image picker">
    <input
      id="uploader"
      style={{ display: 'none' }}
      type="file"
      accept="image/*"
      onChange={uploadImage}
    />
    <ImagePickerIcon id="image-icon" height={20} width={20} color={color} />
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
    <SwatchesGeneratorIcon width={21} height={21} color={color} />
  </StyledSpan>
))

PaletteGenerator.displayName = 'SwatchesGenerator'

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
    <ShadesGeneratorIcon height={20} width={20} color={color} />
  </StyledSpan>
))

ShadesGenerator.displayName = 'ShadesGenerator'

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
    <ResetIcon height={18} width={17.5} color={color} />
  </StyledSpan>
))

Reset.displayName = 'Reset'

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
    <TintsGeneratorIcon height={21} width={21} color={color} />
  </StyledSpan>
))

TintsGenerator.displayName = 'TintsGenerator'

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
    <ClipboardIcon height={18} width={19} color={color} />
  </StyledSpan>
))

Clipboard.propTypes = {
  color: PropTypes.string,
  copyColor: PropTypes.func,
  showMsg: PropTypes.bool,
  id: PropTypes.string
}

const GradientGenerator = HOC(({ color, generateGradient }) => (
  <StyledSpan
    tabIndex={0}
    onClick={generateGradient}
    title="Gradient generator"
    onKeyDown={e => (e.keyCode === ENTER_KEY ? generateGradient(e) : null)}
  >
    <GenerateGradientIcon height={20} width={17.5} color={color} />
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
