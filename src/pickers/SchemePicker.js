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
  DEFAULT_COLOR,
  SCHEME_CONTAINER_HEIGHT,
  SCHEME_CONTAINER_WIDTH,
  DARK_COLOR,
  LIGHT_COLOR
} from '../utils/constants'

export default class SchemePicker extends React.Component {
  state = {
    color: new TinyColor(this.props.color).toHexString(),
    swatches: []
  }

  static defaultProps = {
    color: DEFAULT_COLOR,
    theme: 'light',
    // Default color scheme from which swatches are generated
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
    if (
      this.props.color !== prevProps.color &&
      this.props.color !== this.state.color
    ) {
      const newColor = new TinyColor(this.props.color)

      if (newColor.isValid) {
        this.setState({ color: newColor.toHexString() }, () =>
          this.generateSchemes(newColor)
        )
      }
    }
  }

  // Generate new color schemes based on the color input and current format state
  generateSchemes = (color, newState = this.state) => {
    const newSchemes = new TinyColor(color)
      [this.props.scheme](30)
      .map(c => c.toHexString())
      .reverse() // display the colors from light to dark, so reverse the color schemes.

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

  render() {
    const { color, swatches } = this.state

    const { theme } = this.props

    // Set the background color of color picker according to the current theme
    const bg = theme === 'dark' ? DARK_COLOR : LIGHT_COLOR

    // Set icon color according to the current theme
    const iconColor = theme === 'dark' ? LIGHT_COLOR : DARK_COLOR

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
              <BasicTools.Clipboard />
            </div>
          </ColorProvider>
        </div>
      </Container>
    )
  }
}
