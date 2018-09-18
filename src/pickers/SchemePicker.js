import React from 'react'
import TinyColor from 'tinycolor2'
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
    currentFormat: 'Monochromatic'
  }

  static defaultProps = {
    monochromaticSchemes: 30,
    analogousSchemes: 30
  }

  static propTypes = {
    monochromaticSchemes: PropTypes.number,
    analogousSchemes: PropTypes.number
  }

  componentDidMount() {
    this.generateSchemes(this.props.color, this.state)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.color !== this.props.color) {
      const color = new TinyColor(this.props.color)
      // Check if its a valid hex and then update the color
      // on changing the color input field, it only updates the color block if the hex code is valid
      if (color.isValid()) {
        this.generateSchemes(color.toHexString())
        this.setState({ color: color.toHexString() })
      }
    }

    if (prevState.currentFormat !== this.state.currentFormat) {
      this.generateSchemes(this.state.color, this.state)
    }
  }

  generateSchemes = (color, newState = this.state) => {
    const newSchemes = new TinyColor(color)
      [
        newState.currentFormat
          .split(' ')
          .join('')
          .toLowerCase()
      ](30)
      .map(c => c.toHexString())
    // TinyColor appends the original color at the end of the array which is something we don't want to render
    newSchemes.splice(newSchemes - 1, 1)

    // All the color schemes should be unique, so we are using a Set!
    const uniqueSchemes = new Set()

    newSchemes.forEach(scheme => uniqueSchemes.add(scheme))

    this.setState(state => ({ palettes: [...uniqueSchemes] }))
  }

  changeFormat = e => this.setState({ currentFormat: e.target.value })

  updatePalette = color => this.setState({ color })

  // default onChange handler for color input field
  defaultOnChange = color => {
    const newColor = new TinyColor(color)

    if (newColor.isValid()) {
      this.setState({ color: newColor.toHexString() })
      this.generateSchemes(newColor.toHexString())
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
          <Palettes
            schemes={palettes}
            small={true}
            updatePalette={this.updatePalette}
          />
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
