import React from 'react'
import { css, injectGlobal } from 'emotion'
import gradient from 'tinygradient'
import PropTypes from 'prop-types'
import TinyColor from 'tinycolor2'

import Container from '../components/Container'
import ColorInputField from '../components/ColorInputField'
import Slider from '../components/Slider'
import { BasicTools } from '../components/Tools'

const DARK_COLOR = '#1f1f1f'
const DEFAULT_COLOR_ONE = '#81FFEF'
const DEFAULT_COLOR_TWO = '#F067B4'

injectGlobal`
  .label {
    display: inline-block;
    width: 80px;
    position: relative;
    top: 3px;
    left: 4px;
    font-size: 14px;
  }
`

// Colors should be sorted by the color stops
const createGradient = colors =>
  gradient(
    colors.sort((a, b) => {
      // We need to shift the value of one color stop because, tinygradient throws an error when two stops are equal.
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

const ColorStop = ({ color, onChangeColor, value, onChangeStop }) => (
  <div>
    <ColorInputField value={color} onChange={onChangeColor} />
    <span>
      <label className="label">Stops</label>
      <Slider
        min="0"
        max="10"
        step="0.01"
        value={value}
        onChange={onChangeStop}
        color={DARK_COLOR}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
    </span>
  </div>
)

export default class GradientPicker extends React.Component {
  // Clipboard icon
  clipboardIcon = null

  state = {
    // Returns a gradient object
    gradient: gradient(this.props.colorOne, this.props.colorTwo),
    // Default colors
    colorOne: this.props.colorOne,
    colorTwo: this.props.colorTwo,
    // Color position stops
    // Color stops are stopping points in a gradient that show a specific color
    // at the exact location we set.
    colorStopOne: 0,
    colorStopTwo: 0,
    showMsg: false
  }

  static defaultProps = {
    colorOne: DEFAULT_COLOR_ONE,
    colorTwo: DEFAULT_COLOR_TWO,
    // Returns a css gradient string
    getGradient: gradient => {}
  }

  static propTypes = {
    colorOne: PropTypes.string,
    colorTwo: PropTypes.string,
    getGradient: PropTypes.func
  }

  componentDidMount() {
    this.props.getGradient(this.state.gradient.css())

    this.clipboardIcon = document.getElementById('clipboard')

    this.clipboardIcon.addEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.addEventListener('blur', this.hideMsg)
  }

  componentWillUnmount() {
    this.clipboardIcon.removeEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.removeEventListener('blur', this.hideMsg)
  }

  hideMsg = () => this.setState({ showMsg: false })

  // Validate the color in color input field and create the gradient using that color
  validateAndUpdateColor = (prevState, color) => {
    const newColor = new TinyColor(color)

    if (newColor.isValid()) {
      this.setState(
        {
          gradient: gradient(color, prevState.colorTwo)
        },
        () => {
          // Invoke the callback with new gradient
          this.props.getGradient(this.state.gradient.css())
        }
      )
    }
  }

  updateStopOne = e => {
    const value = parseInt(e.target.value)

    this.setState({ colorStopOne: value })

    // color stop position value should be between 0 and 1
    const pos = this.state.colorStopOne / 10

    // Only set the stop property if it's non-zero
    const colorOne =
      pos !== 0 ? { color: this.state.colorOne, pos } : this.state.colorOne
    const colorTwo =
      pos !== 0 ? { color: this.state.colorTwo, pos: 0.2 } : this.state.colorTwo

    this.setState({ gradient: createGradient([colorOne, colorTwo]) }, () =>
      this.props.getGradient(this.state.gradient.css())
    )
  }

  updateStopTwo = e => {
    const value = parseInt(e.target.value)

    this.setState({ colorStopTwo: value })

    const pos = this.state.colorStopTwo / 10

    const colorOne =
      pos !== 0 ? { color: this.state.colorOne, pos: 0.2 } : this.state.colorOne
    const colorTwo =
      pos !== 0 ? { color: this.state.colorTwo, pos } : this.state.colorTwo

    this.setState({ gradient: createGradient([colorOne, colorTwo]) }, () =>
      this.props.getGradient(this.state.gradient.css())
    )
  }

  updateColorOne = color => {
    this.setState({ colorOne: color })

    const newColor = new TinyColor(color)

    if (newColor.isValid()) {
      this.setState(
        {
          gradient: gradient(color, this.state.colorTwo)
        },
        () => {
          // Invoke the callback with new gradient
          this.props.getGradient(this.state.gradient.css())
        }
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
        () => {
          // Invoke the callback with new gradient
          this.props.getGradient(this.state.gradient.css())
        }
      )
    }
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

    return (
      <Container width="170px">
        <ColorBlock gradient={gradient.css()} />
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
          </div>
        </div>
      </Container>
    )
  }
}
