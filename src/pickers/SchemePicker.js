import React from 'react'
import { TinyColor } from '@ctrl/tinycolor'
import { css } from 'emotion'
import PropTypes from 'prop-types'

import Container from '../components/Container'
import ColorBlock from '../components/ColorBlock'
import ColorInputField from '../components/ColorInputField'
import { BasicTools } from '../components/Tools'
import { CompactSwatches } from '../components/CompactSwatches'

import { Provider as ColorProvider } from '../utils/context'
import {
  SCHEME_CONTAINER_HEIGHT,
  SCHEME_CONTAINER_WIDTH
} from '../utils/constants'
import { getThemeVariants } from '../utils/theme'

const MAX_COLOR_SCHEMES = 30

export default class SchemePicker extends React.Component {
  clipboardIcon = null

  state = {
    color: new TinyColor(this.props.color).toHexString(),
    swatches: [],
    showMsg: false
  }

  static defaultProps = {
    color: 'hotpink',
    theme: 'light',
    // Default color scheme from which swatches are generated
    scheme: 'monochromatic'
  }

  static propTypes = {
    color: PropTypes.string,
    onChange: PropTypes.func,
    theme: PropTypes.oneOf(['light', 'dark']),
    scheme: PropTypes.oneOf([
      'monochromatic',
      'splitcomponent',
      'triad',
      'tetrad',
      'analogous'
    ])
  }

  componentDidMount() {
    this.generateSchemes(this.props.color)

    this.clipboardIcon = document.getElementById('scheme-picker-clipboard')

    this.clipboardIcon.addEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.addEventListener('blur', this.hideMsg)
  }

  componentDidUpdate(prevProps) {
    // Only invoked when the color input is updated
    if (
      this.props.color !== prevProps.color &&
      this.props.color !== this.state.color // This ensures that when we click on a swatch, it will not generate the swatches for the currently selected swatch.
    ) {
      const newColor = new TinyColor(this.props.color)

      if (newColor.isValid) {
        this.setState({ color: newColor.toHexString() }, () =>
          this.generateSchemes(newColor)
        )
      }
    }
  }

  componentWillUnmount() {
    this.clipboardIcon.removeEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.removeEventListener('blur', this.hideMsg)
  }

  hideMsg = () => this.setState({ showMsg: false })

  // Generate new color schemes based on the color input and current format state
  generateSchemes = (color, newState = this.state) => {
    const newSchemes = new TinyColor(color)
      [this.props.scheme](MAX_COLOR_SCHEMES) // the max color scheme amount will be adjusted by TinyColor for different color schemes
      .map(c => c.toHexString()) // Get the hex string of each color
      .reverse() // We have to display the colors from light to dark, so reverse the color schemes.

    // All the color schemes should be unique
    const uniqueSchemes = new Set()

    newSchemes.forEach(scheme => uniqueSchemes.add(scheme))
    this.setState({ swatches: [...uniqueSchemes] })
  }

  // Click handler for a palette
  updateSwatch = color => {
    this.setState({ color })

    // Invoke the prop callback
    this.props.onChange && this.props.onChange(color)
  }

  // default onChange handler for color input field
  defaultOnChange = color => {
    const newColor = new TinyColor(color)

    if (newColor.isValid) {
      // Update the color input value
      // Also generate the new schemes based on the new color input
      this.setState({ color: newColor.toHexString() }, () =>
        this.generateSchemes(color)
      )
    }
  }

  copyColor = () => {
    const { color } = this.state

    navigator.clipboard.writeText(color)
    this.setState({ showMsg: true })
  }

  render() {
    const { color, swatches, showMsg } = this.state
    const { bg, iconColor } = getThemeVariants(this.props.theme)

    return (
      <Container
        background={bg}
        width={SCHEME_CONTAINER_WIDTH}
        height={SCHEME_CONTAINER_HEIGHT}
      >
        <ColorBlock color={color} />
        <div style={{ padding: 10 }}>
          <ColorInputField
            value={color}
            onChange={this.props.onChange || this.defaultOnChange}
          />
          <CompactSwatches
            schemes={swatches}
            updateSwatch={this.updateSwatch}
          />
          <ColorProvider value={iconColor}>
            <div
              className={css`
                display: flex;
                justify-content: center;
                margin-top: 10px;
              `}
            >
              <BasicTools.Clipboard
                id="scheme-picker-clipboard"
                showMsg={showMsg}
                copyColor={this.copyColor}
              />
            </div>
          </ColorProvider>
        </div>
      </Container>
    )
  }
}
