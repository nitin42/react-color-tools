import React from 'react'
import { css, injectGlobal } from 'emotion'
import { ColorExtractor } from 'react-color-extractor'
import generateColors from 'randomcolor'
import { TinyColor } from '@ctrl/tinycolor'
import Values from 'values.js'
import PropTypes from 'prop-types'

import { Provider as ColorProvider } from '../utils/context'

import ColorInput from '../components/ColorInputField'
import ColorBlock from '../components/ColorBlock'
import Container from '../components/Container'
import Image from '../components/Image'
import Swatches from '../components/Swatches'
import Triangle from '../components/Triangle'
import ColorFormatPicker from '../components/ColorFormatPicker'
import { AdvanceTools, BasicTools } from '../components/Tools'

const DARK_COLOR = '#1f1f1f'
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
const DEFAULT_COLOR = '#088da5'
const MAX_COLORS = 64

injectGlobal`
  .icon {
    display: inline-block;
    width: 20px;
    position: relative;
    top: 5px;
    left: -5px;
  }

  .values {
    display: inline-block;
    width: 10px;
    position: relative;
    top: 3px;
    left: 4px;
  }

  i:not(.icon) {
    cursor: pointer;
  }

  span:focus > i {
    outline: none;
  }

  ul {
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr;
    grid-gap: 15px;
    list-style: none;
    margin-left: -28px;
  }
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
    lighten: 0,
    brighten: 0,
    darken: 0,
    spin: 0,
    desaturate: 0,
    saturate: 0
  }

  static defaultProps = {
    color: DEFAULT_COLOR,
    swatches: DEFAULT_SWATCHES,
    // Max amount of colors from which palettes will be generated (from the image)
    maxColors: MAX_COLORS,
    triangle: true,
    theme: 'light',
    // Color tools are disabled by default
    showTools: false,
    onSwatchHover: () => {}
  }

  static propTypes = {
    color: PropTypes.string,
    /* eslint-disable react/require-default-props */
    onChange: PropTypes.func,
    onSwatchHover: PropTypes.func,
    swatches: PropTypes.arrayOf(PropTypes.string),
    maxColors: PropTypes.number,
    triangle: PropTypes.bool,
    theme: PropTypes.string,
    showTools: PropTypes.bool
  }

  // Instance properties are used to store the color value on
  // which the color operations will be applied.
  lightenColor = null

  brightenColor = null

  darkenColor = null

  spinColor = null

  desaturateColor = null

  saturateColor = null

  componentDidMount() {
    this.uploadElement = document.getElementById('uploader')
    this.imageIcon = document.getElementById('image-icon')

    this.imageIcon.addEventListener('click', this.simulateClick)

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
    document.removeEventListener('keydown', this.updateKey)
  }

  // default onChange handler for color input field
  defaultOnChange = color => {
    const newColor = new TinyColor(color)

    if (newColor.isValid) {
      this.setState({ color: newColor })
    }
  }

  updateColorState = (value, color, operation) => {
    // This clears all the color buffers except the buffer which is
    // currently being used to persist the original color
    this.clearColorBuffer(operation)

    const newValue = parseInt(value)
    const newColor = new TinyColor(color)[operation](newValue)

    this.props.onChange && this.props.onChange(newColor.toHexString())
    this.setState({ [operation]: newValue, color: newColor })
  }

  getBuffer = () => ({
    spin: this.spinColor,
    desaturate: this.desaturateColor,
    saturate: this.saturateColor,
    lighten: this.lightenColor,
    brighten: this.brightenColor,
    darken: this.darkenColor
  })

  clearAllColorBuffers = () => {
    this.spinColor = null
    this.saturateColor = null
    this.desaturateColor = null
    this.lightenColor = null
    this.darkenColor = null
    this.brightenColor = null
  }

  clearColorBuffer = currentBuffer => {
    const bufferObj = this.getBuffer()

    Object.keys(bufferObj).forEach(key => {
      if (currentBuffer && currentBuffer.length > 0) {
        if (key !== currentBuffer) {
          bufferObj[key] = null
        }
      }
    })
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

  // 'spin' operation spin (changes) the current hue
  handleSpin = e => {
    if (this.spinColor === null) {
      this.spinColor = this.state.color.originalInput
    }

    this.updateColorState(e.target.value, this.spinColor, 'spin')
  }

  // 'saturation' controls the intensity (or purity) of a color
  handleSaturate = e => {
    if (this.saturateColor === null) {
      this.saturateColor = this.state.color.originalInput
    }

    this.updateColorState(e.target.value, this.saturateColor, 'saturate')
  }

  // 'desaturation' makes a color more muted (with black or grey)
  handleDesaturate = e => {
    if (this.desaturateColor === null) {
      this.desaturateColor = this.state.color.originalInput
    }

    this.updateColorState(e.target.value, this.desaturateColor, 'desaturate')
  }

  handleBrighten = e => {
    if (this.brightenColor === null) {
      this.brightenColor = this.state.color.originalInput
    }

    this.updateColorState(e.target.value, this.brightenColor, 'brighten')
  }

  handleDarken = e => {
    if (this.darkenColor === null) {
      this.darkenColor = this.state.color.originalInput
    }

    this.updateColorState(e.target.value, this.darkenColor, 'darken')
  }

  handleLighten = e => {
    if (this.lightenColor === null) {
      this.lightenColor = this.state.color.originalInput
    }

    this.updateColorState(e.target.value, this.lightenColor, 'lighten')
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
      this.setState({ image: null, showShades: false, showTints: false })
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
      showTints: false
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
        lighten: 0,
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
      showTints: false
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
      lighten,
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
      <Container background={bg} width="228px">
        {/* eslint-disable operator-linebreak */}
        {/* eslint-disable indent */}
        {this.props.triangle &&
          this.state.image === null && (
            <Triangle color={this.state.color.toHexString()} />
          )}
        {this.state.image === null ? (
          <ColorBlock
            colorState={this.state.color}
            color={color}
            currentFormat={currentFormat}
          />
        ) : (
          <Image src={this.state.image} />
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
            <div
              className={css`
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                grid-gap: 5px;
                margin-right: -20px;
                margin-top: 20px;
              `}
            >
              <BasicTools.ImagePicker uploadImage={this.uploadImage} />
              <BasicTools.PaletteGenerator
                generateSwatches={this.generateSwatches}
              />
              <BasicTools.TintsGenerator generateTints={this.generateTints} />
              <BasicTools.ShadesGenerator
                generateShades={this.generateShades}
              />
              <BasicTools.Clipboard
                copyColor={() => navigator.clipboard.writeText(color)}
              />
              <BasicTools.Reset resetColors={this.resetColors} />
            </div>
          </ColorProvider>
          {this.props.showTools ? (
            <div>
              <ColorProvider value={iconColor}>
                <ul>
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
                    <AdvanceTools.ColorLightener
                      value={lighten}
                      onChange={this.handleLighten}
                    />
                  </li>
                  <li>
                    <AdvanceTools.ColorBrightener
                      value={brighten}
                      onChange={this.handleBrighten}
                    />
                  </li>
                </ul>
              </ColorProvider>
            </div>
          ) : null}
        </div>
      </Container>
    )
  }
}
