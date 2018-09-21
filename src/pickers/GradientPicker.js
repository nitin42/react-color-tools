import React from 'react'
import gradient from 'tinygradient'
import PropTypes from 'prop-types'
import TinyColor from '@ctrl/tinycolor'
import styled, { css } from 'react-emotion'

import Container from '../components/Container'
import ColorInputField from '../components/ColorInputField'
import Slider from '../components/Slider'
import { BasicTools } from '../components/Tools'

import { Provider as ColorProvider, Consumer } from '../utils/context'
import {
  DARK_COLOR,
  LIGHT_COLOR,
  DEFAULT_COLOR_ONE,
  DEFAULT_COLOR_TWO,
  GRADIENT_CONTAINER_WIDTH
} from '../utils/constants'
import { randomColors } from '../utils/colors'

const StyledLabel = styled('label')`
  display: inline-block;
  width: 80px;
  position: relative;
  top: 3px;
  left: 4px;
  font-size: 14px;
  margin-bottom: 5px;
  color: ${props => props.color};
`

// Colors should be sorted by the color stops position values
const createGradient = colors =>
  gradient(
    colors.sort((a, b) => {
      // We need to shift the value of either color stop because tinygradient
      // throws an error when two stops are equal.
      if (a.pos && b.pos && a.pos === b.pos) {
        /* eslint-disable no-param-reassign */
        a.pos += 0.01
      }

      return a.pos - b.pos
    })
  )

const ColorBlock = ({ gradient: gradientCss }) => (
  <div
    className={css`
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 110px;
      border-radius: 6px 6px 0px 0px;
    `}
    style={{ backgroundImage: gradientCss }}
  />
)

ColorBlock.propTypes = {
  gradient: PropTypes.string.isRequired
}

const ColorStop = ({
  color: inputColor,
  onChangeColor,
  value,
  onChangeStop
}) => (
  <Consumer>
    {color => (
      <div>
        <ColorInputField value={inputColor} onChange={onChangeColor} />
        <span>
          <StyledLabel color={color} className="label">
            Stops
          </StyledLabel>
          <Slider
            min="0"
            max="10"
            step="0.01"
            value={value}
            onChange={onChangeStop}
            color={color}
            style={{ marginTop: 10, marginBottom: 10 }}
          />
        </span>
      </div>
    )}
  </Consumer>
)

ColorStop.propTypes = {
  color: PropTypes.string.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  onChangeStop: PropTypes.func.isRequired
}

export default class GradientPicker extends React.Component {
  // Clipboard icon element
  clipboardIcon = null

  state = {
    // Returns a gradient object
    gradient: this.props.reverse
      ? gradient(this.props.colorOne, this.props.colorTwo).reverse()
      : gradient(this.props.colorOne, this.props.colorTwo),
    // Default colors
    colorOne: this.props.colorOne,
    colorTwo: this.props.colorTwo,
    // Color stops are stopping points in a gradient that show a specific color
    // at the exact location we set.
    colorStopOne: 0,
    colorStopTwo: 0,
    // Show copy msg
    showMsg: false
  }

  static defaultProps = {
    colorOne: DEFAULT_COLOR_ONE,
    colorTwo: DEFAULT_COLOR_TWO,
    // When set to true, reverse the gradient
    reverse: false,
    // Returns a css gradient string. It is invoked on every operation like
    // (setting stop values, or updating the color input field)
    /* eslint-disable no-unused-vars */
    getGradient: grad => {},
    theme: 'light'
    // These defaults are built-in in tinygradient module
    // mode: linear
    // direction: to right,
  }

  static propTypes = {
    colorOne: PropTypes.string,
    colorTwo: PropTypes.string,
    getGradient: PropTypes.func,
    theme: PropTypes.oneOf(['light', 'dark']),
    /* eslint-disable react/require-default-props */
    mode: PropTypes.oneOf(['linear', 'radial']),
    direction: PropTypes.string,
    reverse: PropTypes.bool
  }

  componentDidMount() {
    this.propCallback()

    this.clipboardIcon = document.getElementById('gradient-clipboard')

    this.clipboardIcon.addEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.addEventListener('blur', this.hideMsg)
  }

  componentWillUnmount() {
    this.clipboardIcon.removeEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.removeEventListener('blur', this.hideMsg)
  }

  hideMsg = () => this.setState({ showMsg: false })

  setColorStopOne = pos => {
    // Only set the stop property if it's non-zero
    /* eslint-disable operator-linebreak */

    const colorOne =
      pos !== 0 ? { color: this.state.colorOne, pos } : this.state.colorOne
    const colorTwo =
      pos !== 0 ? { color: this.state.colorTwo, pos: 0.2 } : this.state.colorTwo

    return {
      colorOne,
      colorTwo
    }
  }

  setColorStopTwo = pos => {
    /* eslint-disable operator-linebreak */
    const colorOne =
      pos !== 0 ? { color: this.state.colorOne, pos: 0.2 } : this.state.colorOne

    const colorTwo =
      pos !== 0 ? { color: this.state.colorTwo, pos } : this.state.colorTwo

    return {
      colorOne,
      colorTwo
    }
  }

  /* eslint-disable indent */
  propCallback = () =>
    this.props.reverse
      ? this.props.getGradient(
          this.state.gradient
            .reverse()
            .css(this.props.mode, this.props.direction)
        )
      : this.props.getGradient(
          this.state.gradient.css(this.props.mode, this.props.direction)
        )

  updateColorStop = (e, color) => {
    const value = parseInt(e.target.value)
    // color stop position value should be between 0 and 1
    const pos = this.state[color] / 10

    // Create the gradient depending on the color stop value
    if (color === 'colorStopOne') {
      const { colorOne, colorTwo } = this.setColorStopOne(pos)

      this.setState(
        { gradient: createGradient([colorOne, colorTwo]), [color]: value },
        this.propCallback
      )
    } else if (color === 'colorStopTwo') {
      const { colorOne, colorTwo } = this.setColorStopTwo(pos)

      this.setState(
        { gradient: createGradient([colorOne, colorTwo]), [color]: value },
        this.propCallback
      )
    }
  }

  // Create the gradient when the color stop value for color changes

  updateStopOne = e => this.updateColorStop(e, 'colorStopOne')

  updateStopTwo = e => this.updateColorStop(e, 'colorStopTwo')

  // Create the gradient when the either color changes

  updateColorOne = color => {
    this.setState({ colorOne: color })

    const newColor = new TinyColor(color)

    if (newColor.isValid) {
      this.setState(
        state => ({
          gradient: gradient(color, state.colorTwo)
        }),
        this.propCallback
      )
    }
  }

  updateColorTwo = color => {
    this.setState({ colorTwo: color })

    const newColor = new TinyColor(color)

    if (newColor.isValid) {
      this.setState(
        state => ({
          gradient: gradient(state.colorOne, color)
        }),
        this.propCallback
      )
    }
  }

  // Generate different color inputs and create a gradient using those input values
  generateGradient = () => {
    const iterator = randomColors().values()

    const colorOne = iterator.next().value
    const colorTwo = iterator.next().value

    this.setState(
      { colorOne, colorTwo, gradient: gradient(colorOne, colorTwo) },
      this.propCallback
    )
  }

  render() {
    const {
      gradient: grad,
      colorOne,
      colorTwo,
      colorStopOne,
      colorStopTwo,
      showMsg
    } = this.state

    const { theme } = this.props

    // Set the background color of color picker according to the current theme
    const bg = theme === 'dark' ? DARK_COLOR : LIGHT_COLOR

    // Set icon color according to the current theme
    const iconColor = theme === 'dark' ? LIGHT_COLOR : DARK_COLOR

    return (
      <Container background={bg} width={GRADIENT_CONTAINER_WIDTH}>
        <ColorBlock gradient={grad.css()} />
        <ColorProvider value={iconColor}>
          <div style={{ padding: 10 }}>
            <ColorStop
              color={colorOne}
              value={colorStopOne}
              onChangeColor={this.updateColorOne}
              onChangeStop={this.updateStopOne}
            />
            <ColorStop
              color={colorTwo}
              value={colorStopTwo}
              onChangeColor={this.updateColorTwo}
              onChangeStop={this.updateStopTwo}
            />
            <div
              className={css`
                display: flex;
                justify-content: center;
                margin-top: 10px;
              `}
            >
              <BasicTools.Clipboard
                id="gradient-clipboard"
                showMsg={showMsg}
                copyColor={() => {
                  navigator.clipboard.writeText(grad.css())
                  this.setState({ showMsg: true })
                }}
              />
              <div style={{ marginLeft: 10 }}>
                <BasicTools.GradientGenerator
                  generateGradient={this.generateGradient}
                />
              </div>
            </div>
          </div>
        </ColorProvider>
      </Container>
    )
  }
}
