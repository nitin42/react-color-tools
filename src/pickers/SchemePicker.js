import React from 'react'
import { TinyColor } from '@ctrl/tinycolor'
import { css } from 'emotion'
import PropTypes from 'prop-types'

import Container from '../components/Container'
import ColorBlock from '../components/ColorBlock'
import ColorInputField from '../components/ColorInputField'
import ColorFormatPicker from '../components/ColorFormatPicker'
import { BasicTools } from '../components/Tools'
import { Palettes } from '../components/Palettes'

export default class SchemePicker extends React.Component {
  state = {
    // Input color
    color: new TinyColor(this.props.color).toHexString(),
    // Swatches for the input color
    swatches: []
  }

  static defaultProps = {
    color: '#F067B4',
    theme: 'light',
    scheme: 'monochromatic'
  }

  static propTypes = {
    color: PropTypes.string,
    onChange: PropTypes.func,
    theme: PropTypes.oneOf(['light', 'dark']),
    scheme: PropTypes.string
  }

  componentDidMount() {
    this.generateSchemes(this.props.color)
  }

  componentDidUpdate(prevProps) {
    if (this.props.color !== prevProps.color) {
      const newColor = new TinyColor(this.props.color)

      if (newColor.isValid) {
        this.setState({ color: newColor.toHexString() })
      }
    }
  }

  // Generate new color schemes based on the color input and current format state
  generateSchemes = (color, newState = this.state) => {
    const newSchemes = new TinyColor(color)
      [this.props.scheme](30)
      .map(c => c.toHexString())
      .reverse() // We render the colors from light to dark, so reverse the color schemes.

    // All the color schemes should be unique
    const uniqueSchemes = new Set()

    newSchemes.forEach(scheme => uniqueSchemes.add(scheme))

    this.setState({ swatches: [...uniqueSchemes] })
  }

  // Click handler for a palette
  updatePalette = color => {
    // Preserve the old palettes while updating color state
    // Only generate new palettes when the format changes or color input is updated
    this.setState({ color })

    this.props.onChange && this.props.onChange(color)
  }

  // default onChange handler for color input field
  defaultOnChange = color => {
    const newColor = new TinyColor(color)

    if (newColor.isValid) {
      // Update the color input value
      // Also generate the new schemes based on the new color input
      this.setState({ color: newColor.toHexString() })
    }
  }

  render() {
    const { color, swatches } = this.state

    return (
      <Container width="200px" height="225px">
        <ColorBlock color={color} />
        <div style={{ padding: 10 }}>
          <ColorInputField
            value={color}
            onChange={this.props.onChange || this.defaultOnChange}
          />
          <Palettes schemes={swatches} updatePalette={this.updatePalette} />
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
