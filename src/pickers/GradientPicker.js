import React from 'react'
import { css, injectGlobal } from 'emotion'
import gradient from 'tinygradient'
import PropTypes from 'prop-types'
import TinyColor from 'tinycolor2'
import generateColors from 'randomcolor'

import Container from '../components/Container'
import ColorInputField from '../components/ColorInputField'
import Slider from '../components/Slider'
import { BasicTools } from '../components/Tools'
import { Provider as ColorProvider, Consumer } from '../utils/context'

const DARK_COLOR = '#1f1f1f'
const DEFAULT_COLOR_ONE = '#81FFEF'
const DEFAULT_COLOR_TWO = '#F067B4'
const LIGHT_COLOR = 'rgb(255, 255, 255)'

const randomColors = () => {
  let i = 0
  const newColors = new Set()

  while (i < 3) {
    newColors.add(generateColors())
    i += 1
  }

  return newColors
}

injectGlobal`
  .label {
    display: inline-block;
    width: 80px;
    position: relative;
    top: 3px;
    left: 4px;
    font-size: 14px;
    margin-bottom: 5px;
  }
`

// Colors should be sorted by the color stops position values
const createGradient = colors =>
  gradient(
    colors.sort((a, b) => {
      // We need to shift the value of either color stop because tinygradient throws an error when two stops are equal.
      if (a.pos && b.pos && a.pos === b.pos) {
        a.pos += 0.01
      }

      return a.pos - b.pos
    })
  )

const ColorBlock = ({ gradient }) => (
  <div
    className={css`
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 110px;
      border-radius: 6px 6px 0px 0px;
    `}
    style={{ background: gradient }}
  />
)

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
          <label className="label" style={{ color }}>
            Stops
          </label>
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

export default class GradientPicker extends React.Component {
  // Clipboard icon element
  clipboardIcon = null

  state = {
    // Returns a gradient object
    gradient: gradient(this.props.colorOne, this.props.colorTwo),
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
    // Returns a css gradient string. It is invoked on every operation (setting stop values, or updating the color input field)
    getGradient: gradient => {},
    theme: 'light'
  }

  static propTypes = {
    colorOne: PropTypes.string,
    colorTwo: PropTypes.string,
    getGradient: PropTypes.func,
    theme: PropTypes.string
  }

  componentDidMount() {
    this.propCallback()

    this.clipboardIcon = document.getElementById('clipboard')

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
    const colorOne =
      pos !== 0 ? { color: this.state.colorOne, pos: 0.2 } : this.state.colorOne

    const colorTwo =
      pos !== 0 ? { color: this.state.colorTwo, pos } : this.state.colorTwo

    return {
      colorOne,
      colorTwo
    }
  }

  propCallback = () => this.props.getGradient(this.state.gradient.css())

  updateColorStop = (e, color) => {
    const value = parseInt(e.target.value)
    this.setState({ [color]: value })

    // color stop position value should be between 0 and 1
    const pos = this.state[color] / 10

    // Create the gradient depending on the color stop value
    if (color === 'colorStopOne') {
      const { colorOne, colorTwo } = this.setColorStopOne(pos)

      this.setState(
        { gradient: createGradient([colorOne, colorTwo]) },
        this.propCallback
      )
    } else if (color === 'colorStopTwo') {
      const { colorOne, colorTwo } = this.setColorStopTwo(pos)

      this.setState(
        { gradient: createGradient([colorOne, colorTwo]) },
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

    if (newColor.isValid()) {
      this.setState(
        {
          gradient: gradient(color, this.state.colorTwo)
        },
        this.propCallback
      )
    }
  }

  updateColorTwo = color => {
    this.setState({ colorTwo: color })

    const newColor = new TinyColor(color)

    if (newColor.isValid()) {
      this.setState(
        {
          gradient: gradient(this.state.colorOne, color)
        },
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
      gradient,
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
      <Container background={bg} width="170px">
        <ColorBlock gradient={gradient.css()} />
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
                showMsg={showMsg}
                copyColor={() => {
                  navigator.clipboard.writeText(gradient.css())
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
