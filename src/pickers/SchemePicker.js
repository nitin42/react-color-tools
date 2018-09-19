import React from 'react'
import { TinyColor } from '@ctrl/tinycolor'
import { css } from 'emotion'
import PropTypes from 'prop-types'

import Container from '../components/Container'
import ColorBlock from '../components/ColorBlock'
import Swatches from '../components/Swatches'
import ColorInputField from '../components/ColorInputField'
import ColorFormatPicker from '../components/ColorFormatPicker'
import { BasicTools } from '../components/Tools'
import { Palettes } from '../components/Palettes'

export default class SchemePicker extends React.Component {
  state = {
    // Input color
    color: new TinyColor(this.props.color).toHexString(),
    // Palettes for the input color
    palettes: [],
    // Palettes options
    formats: [
      // Monochromatic generates various shades, tints or tones of a hue
      'Monochromatic',
      // Generates the colors which are side by side on the color wheel
      'Analogous',
      // Any color on the color wheel plus the two which flank its complement
      'Split Complement',
      // Any three colors that are evenly spaced on the color wheel
      'Triad',
      // Two complementary pairs of colors
      'Tetrad'
    ],
    currentFormat: 'Monochromatic',
    preservePreviousPalettes: false
  }

  static defaultProps = {
    monochromaticSchemes: 30,
    analogousSchemes: 30,
    color: '#F067B4',
    theme: 'light'
  }

  static propTypes = {
    monochromaticSchemes: PropTypes.number,
    analogousSchemes: PropTypes.number,
    color: PropTypes.string,
    onChange: PropTypes.func,
    theme: PropTypes.oneOf(['light', 'dark'])
  }

  componentDidMount() {
    this.generateSchemes(this.props.color)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.color !== prevProps.color &&
      !this.state.preservePreviousPalettes
    ) {
      const newColor = new TinyColor(this.props.color)

      if (newColor.isValid) {
        this.setState(
          { color: newColor.toHexString(), preservePreviousPalettes: false },
          () => this.generateSchemes(newColor.toHexString())
        )
      }
    }

    if (
      this.state.color !== prevState.color &&
      !this.state.preservePreviousPalettes
    ) {
      const newColor = new TinyColor(this.state.color)

      if (newColor.isValid) {
        this.setState({ color: newColor.toHexString() }, () =>
          this.generateSchemes(newColor.toHexString())
        )
      }
    }

    if (
      this.props.color !== prevProps.color &&
      this.state.preservePreviousPalettes
    ) {
      this.setState({
        palettes: [...prevState.palettes],
        preservePreviousPalettes: false
      })
    }

    if (prevState.currentFormat !== this.state.currentFormat) {
      this.generateSchemes(this.state.color)
    }
  }

  // Set the count for palette that will be generated
  setPalettesCount = format => {
    if (
      format === 'Split Complement' ||
      format === 'Tetrad' ||
      format === 'Triad'
    ) {
      return null
    }
    if (
      this.props.monochromaticSchemes &&
      typeof this.props.monochromaticSchemes === 'number'
    ) {
      return this.props.monochromaticSchemes
    }
    if (
      this.props.analogousSchemes &&
      typeof this.props.monochromaticSchemes === 'number'
    ) {
      return this.props.analogousSchemes
    }
  }

  // Generate new color schemes based on the color input and current format state
  generateSchemes = (color, newState = this.state) => {
    const newSchemes = new TinyColor(color)
      [
        newState.currentFormat
          .split(' ')
          .join('')
          .toLowerCase()
      ](this.setPalettesCount(newState.currentFormat))
      .map(c => c.toHexString())
      .reverse() // We render the colors from light to dark, so reverse the color schemes.

    // All the color schemes should be unique
    const uniqueSchemes = new Set()

    newSchemes.forEach(scheme => uniqueSchemes.add(scheme))

    this.setState({ palettes: [...uniqueSchemes] })
  }

  // Change the format for generating different schemes
  changeFormat = e =>
    this.setState({
      currentFormat: e.target.value,
      preservePreviousPalettes: false
    })

  // Click handler for a palette
  updatePalette = color => {
    // Preserve the old palettes while updating color state
    // Only generate new palettes when the format changes or color input is updated
    this.setState({ color, preservePreviousPalettes: true })

    this.props.onChange && this.props.onChange(color)
  }

  // default onChange handler for color input field
  defaultOnChange = color => {
    const newColor = new TinyColor(color)

    if (newColor.isValid) {
      // Update the color input value
      // Also generate the new schemes based on the new color input
      this.setState(
        { color: newColor.toHexString(), preservePreviousPalettes: false },
        () => this.generateSchemes(newColor.toHexString())
      )
    }
  }

  render() {
    const { palettes, color, swatches, formats } = this.state

    return (
      <Container width="200px">
        <ColorBlock color={color} />
        <div style={{ padding: 10 }}>
          <ColorInputField
            value={color}
            onChange={this.props.onChange || this.defaultOnChange}
          />
          <Palettes schemes={palettes} updatePalette={this.updatePalette} />
          <ColorFormatPicker
            top={5}
            formats={formats}
            changeFormat={this.changeFormat}
          />
          <div
            className={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
            `}
          >
            <BasicTools.Clipboard />
          </div>
        </div>
      </Container>
    )
  }
}
