import React from 'react'
import { ColorExtractor } from 'react-color-extractor'
import generateColors from 'randomcolor'
import { TinyColor } from '@ctrl/tinycolor'
import Values from 'values.js'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

import { Provider as ColorProvider } from '../utils/context'

import ColorInput from '../components/ColorInputField'
import ColorBlock from '../components/ColorBlock'
import Container from '../components/Container'
import Image from '../components/Image'
import Swatches from '../components/Swatches'
import Triangle from '../components/Triangle'
import ColorFormatPicker from '../components/ColorFormatPicker'
import { AdvanceTools, BasicTools } from '../components/Tools'

// Copied from primer/primer-tooltips/build
import '../styles/tooltip.css'

// DARK THEME
const DARK_COLOR = '#1f1f1f'
// LIGHT THEME
const LIGHT_COLOR = 'rgb(255, 255, 255)'

const DEFAULT_SWATCHES = [
  '#5a80b4',
  '#40e0d0',
  '#088da5',
  '#f6546a',
  '#cac8a0',
  '#0079cf',
  '#ffa6ca',
  '#03ec13',
  '#3999dc',
  '#e1c9ec',
  '#2f9d66',
  '#daa520'
]

// DEFAULT COLOR INPUT
const DEFAULT_COLOR = '#088da5'
// REQUIRED FOR GENERATING SWATCHES FROM AN IMAGE
const MAX_COLORS = 64
// WIDTH OF THE COLOR PICKER
const COLOR_CONTAINER_WIDTH = '228px'

const StyledList = styled('ul')`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  list-style: none;
  margin-left: -28px;
`

const ToolsContainer = styled('div')`
  display: grid;
  grid-template-columns: ${props =>
    `repeat(${props.columns || 6}, ${props.size || '1fr'})`};
  grid-gap: ${props => props.gap || '5px'};
  margin-right: -20px;
  margin-top: 20px;
`

export default class BasicPicker extends React.PureComponent {
  // Color conversion helpers
  static toRGB = color => new TinyColor(color).toRgbString()

  static toHSL = color => new TinyColor(color).toHslString()

  static toHSV = color => new TinyColor(color).toHsvString()

  static toRGBPercent = color => new TinyColor(color).toPercentageRgbString()

  // Image upload icon
  imageIcon = null

  // Hidden input element for uploading an image
  uploadElement = null

  // Clipboard icon
  clipboardIcon = null

  state = {
    // Current block, active and input field color (or hue)
    color: new TinyColor(this.props.color),
    // Current swatches to be displayed in picker
    swatches: this.props.swatches,
    // Image from which colors are extracted
    image: null,
    // Shades are the hue darkened with black
    shades: [],
    // Tints are the hue lightend with white
    tints: [],
    // Should display the shades swatches
    showShades: false,
    // Should display the tint swatches
    showTints: false,
    // Current color format selected
    currentFormat: 'HEX',
    // Color format options
    formats: ['HEX', 'HSV', 'RGB', 'HSL'],
    // Color manipulation values
    // Brightens the currently selected color by an amount
    brighten: 0,
    // Darkens the currently selected color by an amount
    darken: 0,
    // spin operation spins (changes) the current hue
    spin: 0,
    // desaturation makes a color more muted (with black or grey)
    desaturate: 0,
    // saturation controls the intensity (or purity) of a color
    saturate: 0,
    // Show or hide color copied msg
    showMsg: false
  }

  static defaultProps = {
    color: DEFAULT_COLOR,
    swatches: DEFAULT_SWATCHES,
    // Max amount of colors from which palettes will be generated (from the image)
    maxColors: MAX_COLORS,
    triangle: true,
    theme: 'light',
    // Color tools are disabled by default
    showTools: false
  }

  static propTypes = {
    color: PropTypes.string,
    /* eslint-disable react/require-default-props */
    onChange: PropTypes.func,
    onSwatchHover: PropTypes.func,
    swatches: PropTypes.arrayOf(PropTypes.string),
    maxColors: PropTypes.number,
    triangle: PropTypes.bool,
    theme: PropTypes.oneOf(['light', 'dark']),
    showTools: PropTypes.bool
  }

  // Instance properties are used to store the color state on
  // which the color operations will be applied.
  brightenColor = null

  darkenColor = null

  spinColor = null

  desaturateColor = null

  saturateColor = null

  componentDidMount() {
    this.uploadElement = document.getElementById('uploader')
    this.imageIcon = document.getElementById('image-icon')
    this.clipboardIcon = document.getElementById('clipboard')

    this.imageIcon.addEventListener('click', this.simulateClick)
    this.clipboardIcon.addEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.addEventListener('blur', this.hideMsg)

    // Attach a listener for deleting the image (if any) from the color block
    document.addEventListener('keydown', this.updateKey)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      const color = new TinyColor(this.props.color)
      // Check if its a valid hex and then update the color
      // on changing the color input field, it only updates the color block if the hex code is valid
      if (color.isValid) {
        this.setState({ color })
      }
    }
  }

  componentWillUnmount() {
    this.imageIcon.removeEventListener('click', this.simulateClick)
    this.clipboardIcon.removeEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.removeEventListener('blur', this.hideMsg)
    document.removeEventListener('keydown', this.updateKey)
  }

  hideMsg = () => this.setState({ showMsg: false })

  // default onChange handler for color input field
  defaultOnChange = color => {
    const newColor = new TinyColor(color)

    if (newColor.isValid) {
      this.setState({ color: newColor })
    }
  }

  updateColorState = (value, color, operation) => {
    const newValue = parseInt(value)
    const newColor = new TinyColor(color)[operation](newValue)

    this.props.onChange && this.props.onChange(newColor.toHexString())
    this.setState({ [operation]: newValue, color: newColor })
  }

  clearAllColorBuffers = () => {
    this.spinColor = null
    this.saturateColor = null
    this.desaturateColor = null
    this.darkenColor = null
    this.brightenColor = null
  }

  /**
   * Below methods are used to handle color operations. Whenever an
   * operation is performed on a color, it mutates the original state
   * of the color. So we use instance properties to clear and set the
   * currently active color state, and then apply the color operations
   * w.r.t to the instance property (or current color value)
   *
   * TODO: Refactor this mess
   */

  handleSpin = e => {
    if (this.spinColor === null) {
      this.spinColor = this.state.color.originalInput
    }

    this.saturateColor = null
    this.desaturateColor = null
    this.brightenColor = null
    this.darkenColor = null

    this.updateColorState(e.target.value, this.spinColor, 'spin')
  }

  handleSaturate = e => {
    if (this.saturateColor === null) {
      this.saturateColor = this.state.color.originalInput
    }

    this.spinColor = null
    this.desaturateColor = null
    this.brightenColor = null
    this.darkenColor = null

    this.updateColorState(e.target.value, this.saturateColor, 'saturate')
  }

  handleDesaturate = e => {
    if (this.desaturateColor === null) {
      this.desaturateColor = this.state.color.originalInput
    }

    this.saturateColor = null
    this.spinColor = null
    this.brightenColor = null
    this.darkenColor = null

    this.updateColorState(e.target.value, this.desaturateColor, 'desaturate')
  }

  handleBrighten = e => {
    if (this.brightenColor === null) {
      this.brightenColor = this.state.color.originalInput
    }

    this.saturateColor = null
    this.desaturateColor = null
    this.spinColor = null
    this.darkenColor = null

    this.updateColorState(e.target.value, this.brightenColor, 'brighten')
  }

  handleDarken = e => {
    if (this.darkenColor === null) {
      this.darkenColor = this.state.color.originalInput
    }

    this.saturateColor = null
    this.desaturateColor = null
    this.brightenColor = null
    this.spinColor = null

    this.updateColorState(e.target.value, this.darkenColor, 'darken')
  }

  // outputs the color according to the color format
  getColor = color => ({
    HSL: color.toHslString(),
    HEX: color.toHexString(),
    RGB: color.toRgbString(),
    HSV: color.toHsvString()
  })

  // This handler is used to update the image state. After the colors
  // are extracted from the image, a image can be removed from the color block.
  updateKey = e => {
    if (e.which === 8) {
      // Remove the image from color block
      this.setState({ image: null })
    }
  }

  simulateClick = e => {
    if (this.uploadElement) {
      this.uploadElement.click()
    }

    e.preventDefault()
  }

  // Randomly generate new swatches
  generateSwatches = () => {
    let i = 0

    // Each swatch should be different
    const newColors = new Set()

    while (i < 12) {
      newColors.add(generateColors())
      i += 1
    }

    // Hide shades and tints when new swatches are added
    this.setState({
      swatches: [...newColors],
      showShades: false,
      showTints: false,
      tints: [],
      shades: []
    })
  }

  uploadImage = e =>
    this.setState({ image: window.URL.createObjectURL(e.target.files[0]) })

  // Updates the hue state
  updateSwatch = color => {
    // If tools are active, then reset color instance properties.
    if (this.props.showTools) {
      this.clearAllColorBuffers()

      this.setState({
        color: new TinyColor(color),
        // Reset all the values for the newly selected swatch
        spin: 0,
        saturate: 0,
        desaturate: 0,
        darken: 0,
        brighten: 0
      })
    } else {
      this.setState({
        color: new TinyColor(color)
      })
    }

    this.props.onChange && this.props.onChange(color)
  }

  // Handler to update swatches when colors are extracted from an image
  updateSwatches = swatches =>
    this.setState({
      swatches: [...swatches],
      // Also update the current color
      color: new TinyColor(swatches[0]),
      // Hide the shades and tints
      showShades: false,
      showTints: false,
      tints: [],
      shades: []
    })

  // Generates shades or tints from the currently selected hue (color)
  generateSwatchesFromHue = (term, showShades, showTints) => {
    const colorBuffer = []
    const color = new Values(this.state.color.toHexString())

    color[term]().forEach(c => colorBuffer.push(c.hexString()))

    this.setState({
      [term]: [...colorBuffer],
      showShades,
      showTints
    })
  }

  // Shades - A hue lightened with white
  generateShades = () => this.generateSwatchesFromHue('shades', true, false)

  // Tints - A hue darkened with black
  generateTints = () => this.generateSwatchesFromHue('tints', false, true)

  // Update the color format (hsv, rgb, hex, or hsl)
  changeFormat = e => this.setState({ currentFormat: e.target.value })

  // Reset the shades and tints, and displays the previous swatches
  resetColors = () =>
    this.setState({
      shades: [],
      tints: [],
      showShades: false,
      showTints: false
    })

  render() {
    const {
      image,
      swatches,
      shades,
      showShades,
      showTints,
      tints,
      currentFormat,
      darken,
      brighten,
      spin,
      desaturate,
      saturate,
      formats
    } = this.state

    // Get the color string with a specified color format
    const color = this.getColor(this.state.color)[currentFormat]

    // Set the background color of color picker according to the current theme
    const bg = this.props.theme === 'dark' ? DARK_COLOR : LIGHT_COLOR

    // Set icon color according to the current theme
    const iconColor = this.props.theme === 'dark' ? LIGHT_COLOR : DARK_COLOR

    return (
      <Container background={bg} width={COLOR_CONTAINER_WIDTH}>
        {/* eslint-disable operator-linebreak */}
        {/* eslint-disable indent */}
        {this.props.triangle &&
          image === null && <Triangle color={this.state.color.toHexString()} />}
        {image === null ? (
          <ColorBlock
            colorState={this.state.color}
            color={color}
            currentFormat={currentFormat}
          />
        ) : (
          <Image src={image} />
        )}
        {image && (
          <ColorExtractor
            maxColors={this.props.maxColors}
            src={image}
            getColors={this.updateSwatches}
          />
        )}
        <div style={{ padding: 10 }}>
          {showShades ? (
            <Swatches
              swatches={shades}
              updateSwatch={this.updateSwatch}
              onSwatchHover={this.props.onSwatchHover}
            />
          ) : showTints ? (
            <Swatches
              swatches={tints}
              updateSwatch={this.updateSwatch}
              onSwatchHover={this.props.onSwatchHover}
            />
          ) : (
            <Swatches
              swatches={swatches}
              updateSwatch={this.updateSwatch}
              onSwatchHover={this.props.onSwatchHover}
            />
          )}
          <ColorInput
            value={color}
            onChange={this.props.onChange || this.defaultOnChange}
          />
          <ColorFormatPicker
            changeFormat={this.changeFormat}
            formats={formats}
          />
          <ColorProvider value={iconColor}>
            <ToolsContainer>
              <BasicTools.ImagePicker uploadImage={this.uploadImage} />
              <BasicTools.PaletteGenerator
                generateSwatches={this.generateSwatches}
              />
              <BasicTools.TintsGenerator generateTints={this.generateTints} />
              <BasicTools.ShadesGenerator
                generateShades={this.generateShades}
              />
              <BasicTools.Clipboard
                copyColor={() => {
                  navigator.clipboard.writeText(color)
                  // Show tooltip
                  this.setState({ showMsg: true })
                }}
                showMsg={this.state.showMsg}
              />
              <BasicTools.Reset resetColors={this.resetColors} />
            </ToolsContainer>
          </ColorProvider>
          {this.props.showTools ? (
            <div>
              <ColorProvider value={iconColor}>
                <StyledList>
                  <li>
                    <AdvanceTools.ColorSpinner
                      value={spin}
                      onChange={this.handleSpin}
                    />
                  </li>
                  <li>
                    <AdvanceTools.ColorSaturator
                      value={saturate}
                      onChange={this.handleSaturate}
                    />
                  </li>
                  <li>
                    <AdvanceTools.ColorDesaturator
                      value={desaturate}
                      onChange={this.handleDesaturate}
                    />
                  </li>
                  <li>
                    <AdvanceTools.ColorDarkener
                      value={darken}
                      onChange={this.handleDarken}
                    />
                  </li>
                  <li>
                    <AdvanceTools.ColorBrightener
                      value={brighten}
                      onChange={this.handleBrighten}
                    />
                  </li>
                </StyledList>
              </ColorProvider>
            </div>
          ) : null}
        </div>
      </Container>
    )
  }
}
