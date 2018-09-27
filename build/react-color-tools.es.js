import React, { createContext } from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'
import { TinyColor } from '@ctrl/tinycolor'
import generateColors from 'randomcolor'
import styled, { css as css$1 } from 'react-emotion'
import { ColorExtractor } from 'react-color-extractor'
import Values from 'values.js'
import clipboard from 'clipboard-polyfill'
import gradient from 'tinygradient'

var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }

    return target
  }

var inherits = function(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var objectWithoutProperties = function(obj, keys) {
  var target = {}

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }

  return target
}

var possibleConstructorReturn = function(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }

  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

var taggedTemplateLiteralLoose = function(strings, raw) {
  strings.raw = raw
  return strings
}

var _templateObject = taggedTemplateLiteralLoose(
  [
    '\n          border: 0px solid ',
    ';\n          box-sizing: border-box;\n          padding: 0px 7px;\n          border-radius: 4px;\n          color: ',
    ';\n          height: 22px;\n          width: 100%;\n          box-shadow: rgb(221, 221, 221) 0px 0px 0px 1px inset;\n          outline: none;\n          font-size: 12px;\n          margin-top: 5px;\n        '
  ],
  [
    '\n          border: 0px solid ',
    ';\n          box-sizing: border-box;\n          padding: 0px 7px;\n          border-radius: 4px;\n          color: ',
    ';\n          height: 22px;\n          width: 100%;\n          box-shadow: rgb(221, 221, 221) 0px 0px 0px 1px inset;\n          outline: none;\n          font-size: 12px;\n          margin-top: 5px;\n        '
  ]
)

var INPUT_COLOR_SCHEME = 'rgb(102, 102, 102)'

// Copied and edited from react-color/EditableInput

var ColorInputField = (function(_React$Component) {
  inherits(ColorInputField, _React$Component)

  function ColorInputField() {
    var _temp, _this, _ret

    classCallCheck(this, ColorInputField)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = possibleConstructorReturn(
        this,
        _React$Component.call.apply(_React$Component, [this].concat(args))
      )),
      _this)),
      (_this.state = {
        value: String(_this.props.value).toUpperCase(),
        blurValue: String(_this.props.value).toUpperCase()
      }),
      (_this.handleBlur = function() {
        if (_this.state.blurValue) {
          _this.setState(function(state) {
            return { value: state.blurValue, blurValue: null }
          })
        }
      }),
      (_this.handleChange = function(e) {
        _this.props.onChange && _this.props.onChange(e.target.value, e)

        _this.setState({ value: e.target.value })
      }),
      (_this.handleKeyDown = function(e) {
        var stringValue = String(e.target.value)
        var isPercentage = stringValue.indexOf('%') > -1
        var number = Number(stringValue.replace(/%/g, ''))

        if (!isNaN(number)) {
          var amount = 1

          if (e.keyCode === 38) {
            _this.props.onChange && _this.props.onChange(number + amount, e)

            if (isPercentage) {
              _this.setState({ value: number + amount + '%' })
            } else {
              _this.setState({ value: number + amount })
            }
          }

          // Down
          if (e.keyCode === 40) {
            _this.props.onChange && _this.props.onChange(number - amount, e)

            if (isPercentage) {
              _this.setState({ value: number - amount + '%' })
            } else {
              _this.setState({ value: number - amount })
            }
          }
        }
      }),
      _temp)),
      possibleConstructorReturn(_this, _ret)
    )
  }

  ColorInputField.prototype.componentWillReceiveProps = function componentWillReceiveProps(
    nextProps
  ) {
    var input = this.input

    if (nextProps.value !== this.state.value) {
      if (input === document.activeElement) {
        this.setState({ blurValue: String(nextProps.value).toUpperCase() })
      } else {
        this.setState(function(state) {
          return {
            value: String(nextProps.value).toUpperCase(),
            blurValue: !state.blurValue && String(nextProps.value).toUpperCase()
          }
        })
      }
    }
  }

  ColorInputField.prototype.render = function render() {
    var _this2 = this

    return React.createElement('input', {
      className: css(_templateObject, INPUT_COLOR_SCHEME, INPUT_COLOR_SCHEME),
      /* eslint-disable no-return-assign */
      ref: function ref(input) {
        return (_this2.input = input)
      },
      value: this.state.value,
      onKeyDown: this.handleKeyDown,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      placeholder: this.props.placeholder,
      spellCheck: 'false'
    })
  }

  return ColorInputField
})(React.Component)

ColorInputField.defaultProps = {
  value: '',
  onChange: function onChange() {},
  placeholder: ''
}

ColorInputField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}

// Copied from react-color/helpers/colors

function toState(data, oldHue) {
  var color = data.hex ? new TinyColor(data.hex) : new TinyColor(data)
  var hsl = color.toHsl()
  var hsv = color.toHsv()
  var rgb = color.toRgb()
  var hex = color.toHex()
  if (hsl.s === 0) {
    hsl.h = oldHue || 0
    hsv.h = oldHue || 0
  }
  var transparent = hex === '000000' && rgb.a === 0

  return {
    hsl: hsl,
    hex: transparent ? 'transparent' : '#' + hex,
    rgb: rgb,
    hsv: hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source
  }
}

// Copied from react-color/helpers/colors

/* eslint-disable import/prefer-default-export */
function getContrastingColor(data) {
  if (!data) {
    return '#fff'
  }
  var col = toState(data)
  if (col.hex === 'transparent') {
    return 'rgba(0,0,0,0.4)'
  }
  var yiq = (col.rgb.r * 299 + col.rgb.g * 587 + col.rgb.b * 114) / 1000
  return yiq >= 128 ? '#000' : '#fff'
}

// Returns a set of random colors (this is used in generating different gradients)
var randomColors = function randomColors() {
  var i = 0
  var newColors = new Set()

  while (i < 3) {
    newColors.add(generateColors())
    i += 1
  }

  return newColors
}

// Color conversion helpers
var utils = {
  toRGB: function toRGB(color) {
    return new TinyColor(color).toRgbString()
  },
  toHSL: function toHSL(color) {
    return new TinyColor(color).toHslString()
  },
  toHSV: function toHSV(color) {
    return new TinyColor(color).toHsvString()
  },
  toRGBPercent: function toRGBPercent(color) {
    return new TinyColor(color).toPercentageRgbString()
  }
}

var _templateObject$1 = taggedTemplateLiteralLoose(
    [
      '\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      position: relative;\n      height: 110px;\n      border-radius: 6px 6px 0px 0px;\n    '
    ],
    [
      '\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      position: relative;\n      height: 110px;\n      border-radius: 6px 6px 0px 0px;\n    '
    ]
  ),
  _templateObject2 = taggedTemplateLiteralLoose(
    ['\n        font-size: 18px;\n        position: relative;\n      '],
    ['\n        font-size: 18px;\n        position: relative;\n      ']
  )

// Displays a color block with the active color hex code
var ColorBlock = function ColorBlock(_ref) {
  var currentFormat = _ref.currentFormat,
    colorState = _ref.colorState,
    color = _ref.color
  return React.createElement(
    'div',
    {
      className: css(_templateObject$1),
      style: {
        background: currentFormat === 'HSV' ? colorState.toHexString() : color
      }
    },
    React.createElement(
      'div',
      {
        className: css(_templateObject2),
        style: {
          color: getContrastingColor(color)
        }
      },
      color
    )
  )
}

ColorBlock.defaultProps = {
  currentFormat: 'HEX',
  colorState: {}
}

ColorBlock.propTypes = {
  color: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  colorState: PropTypes.object,
  currentFormat: PropTypes.string
}

var _templateObject$2 = taggedTemplateLiteralLoose(
  [
    '\n      width: ',
    ';\n      height: ',
    ';\n      background: ',
    ';\n      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px;\n      border-radius: 6px;\n      position: relative;\n    '
  ],
  [
    '\n      width: ',
    ';\n      height: ',
    ';\n      background: ',
    ';\n      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px;\n      border-radius: 6px;\n      position: relative;\n    '
  ]
)

// Main color picker container
var Container = function Container(_ref) {
  var children = _ref.children,
    width = _ref.width,
    background = _ref.background,
    height = _ref.height
  return React.createElement(
    'div',
    {
      className: css(_templateObject$2, width, height, background)
    },
    children
  )
}

Container.defaultProps = {
  width: '222px',
  height: '295px',
  background: 'rgb(255, 255, 255)'
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  background: PropTypes.string
}

var Image = function Image(_ref) {
  var src = _ref.src,
    rest = objectWithoutProperties(_ref, ['src'])
  return React.createElement(
    'img',
    _extends({ src: src, alt: '', style: { width: '228px' } }, rest)
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired
}

var _templateObject$3 = taggedTemplateLiteralLoose(
  [
    '\n      background: ',
    ';\n      height: 22px;\n      width: 22px;\n      cursor: pointer;\n      position: relative;\n      outline: none;\n      float: left;\n      margin-right: 10px;\n      margin-bottom: 10px;\n      border-radius: 4px;\n      &:focus {\n        box-shadow: ',
    ' 0px 0px 4px;\n      }\n    '
  ],
  [
    '\n      background: ',
    ';\n      height: 22px;\n      width: 22px;\n      cursor: pointer;\n      position: relative;\n      outline: none;\n      float: left;\n      margin-right: 10px;\n      margin-bottom: 10px;\n      border-radius: 4px;\n      &:focus {\n        box-shadow: ',
    ' 0px 0px 4px;\n      }\n    '
  ]
)

var Swatch = function Swatch(_ref) {
  var color = _ref.color,
    updateSwatch = _ref.updateSwatch,
    onSwatchHover = _ref.onSwatchHover,
    updateSwatchOnKeyDown = _ref.updateSwatchOnKeyDown
  return React.createElement('div', {
    role: 'swatch',
    className: css(_templateObject$3, color, color),
    title: color,
    onClick: updateSwatch,
    onKeyDown: updateSwatchOnKeyDown,
    onMouseOver: onSwatchHover,
    onFocus: onSwatchHover,
    tabIndex: 0
  })
}

Swatch.defaultProps = {
  updateSwatch: function updateSwatch() {},
  onSwatchHover: function onSwatchHover() {},
  updateSwatchOnKeyDown: function updateSwatchOnKeyDown() {}
}

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
  updateSwatch: PropTypes.func,
  onSwatchHover: PropTypes.func,
  updateSwatchOnKeyDown: PropTypes.func
}

var _templateObject$4 = taggedTemplateLiteralLoose(
  [
    '\n      display: grid;\n      grid-template-columns: repeat(6, 1fr);\n      grid-gap: 5.3px;\n    '
  ],
  [
    '\n      display: grid;\n      grid-template-columns: repeat(6, 1fr);\n      grid-gap: 5.3px;\n    '
  ]
)

var ENTER_KEY = 13

var Swatches = function Swatches(_ref) {
  var swatches = _ref.swatches,
    _updateSwatch = _ref.updateSwatch,
    _onSwatchHover = _ref.onSwatchHover
  return React.createElement(
    'div',
    {
      className: css(_templateObject$4)
    },
    swatches.map(function(color) {
      return React.createElement(Swatch, {
        key: color,
        color: color,
        updateSwatch: function updateSwatch() {
          return _updateSwatch(color)
        },
        updateSwatchOnKeyDown: function updateSwatchOnKeyDown(e) {
          return (
            /* eslint-disable no-unused-vars */
            e.keyCode === ENTER_KEY ? _updateSwatch(color) : null
          )
        },
        onSwatchHover: function onSwatchHover() {
          return _onSwatchHover && _onSwatchHover(color)
        }
      })
    })
  )
}

Swatches.defaultProps = {
  updateSwatch: function updateSwatch() {},
  onSwatchHover: function onSwatchHover() {}
}

Swatches.propTypes = {
  swatches: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateSwatch: PropTypes.func,
  onSwatchHover: PropTypes.func
}

var _templateObject$5 = taggedTemplateLiteralLoose(
  [
    '\n      width: 0px;\n      height: 0px;\n      border-style: solid;\n      border-width: 0 10px 10px 10px;\n      border-color: transparent transparent ',
    ' transparent;\n      position: absolute;\n      top: -10px;\n      left: 50%;\n      margin-left: -10px;\n    '
  ],
  [
    '\n      width: 0px;\n      height: 0px;\n      border-style: solid;\n      border-width: 0 10px 10px 10px;\n      border-color: transparent transparent ',
    ' transparent;\n      position: absolute;\n      top: -10px;\n      left: 50%;\n      margin-left: -10px;\n    '
  ]
)

var Triangle = function Triangle(_ref) {
  var color = _ref.color
  return React.createElement('div', {
    className: css(_templateObject$5, color)
  })
}

Triangle.propTypes = {
  color: PropTypes.string.isRequired
}

var _templateObject$6 = taggedTemplateLiteralLoose(
    [
      '\n      display: flex;\n      justify-content: center;\n      margin-top: 15px;\n    '
    ],
    [
      '\n      display: flex;\n      justify-content: center;\n      margin-top: 15px;\n    '
    ]
  ),
  _templateObject2$1 = taggedTemplateLiteralLoose(
    [
      '\n        border: 0px solid rgb(102, 102, 102);\n        box-sizing: border-box;\n        padding: 0px 7px;\n        border-radius: 4px;\n        color: rgb(102, 102, 102);\n        height: 18px;\n        box-shadow: rgb(221, 221, 221) 0px 0px 0px 1px inset;\n        outline: none;\n        font-size: 12px;\n        color: rgb(102, 102, 102);\n      '
    ],
    [
      '\n        border: 0px solid rgb(102, 102, 102);\n        box-sizing: border-box;\n        padding: 0px 7px;\n        border-radius: 4px;\n        color: rgb(102, 102, 102);\n        height: 18px;\n        box-shadow: rgb(221, 221, 221) 0px 0px 0px 1px inset;\n        outline: none;\n        font-size: 12px;\n        color: rgb(102, 102, 102);\n      '
    ]
  )

var renderFormats = function renderFormats(formats) {
  return formats.map(function(format) {
    return React.createElement('option', { value: format, key: format }, format)
  })
}

var ColorFormatPicker = function ColorFormatPicker(_ref) {
  var changeFormat = _ref.changeFormat,
    formats = _ref.formats
  return React.createElement(
    'div',
    {
      className: css(_templateObject$6)
    },
    React.createElement(
      'select',
      {
        className: css(_templateObject2$1),
        name: 'formats',
        onChange: changeFormat
      },
      renderFormats(formats)
    )
  )
}

ColorFormatPicker.propTypes = {
  formats: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeFormat: PropTypes.func.isRequired
}

var _templateObject$7 = taggedTemplateLiteralLoose(
  [
    '\n      -webkit-appearance: none;\n      width: 140px;\n      height: 2px;\n      border-radius: 5px;\n      background: #dcdcdc;\n      outline: none;\n      opacity: 0.7;\n      -webkit-transition: 0.2s;\n      transition: opacity 0.2s;\n\n      ::-webkit-slider-thumb {\n        -webkit-appearance: none;\n        appearance: none;\n        width: 15px;\n        height: 15px;\n        border-radius: 50%;\n        cursor: pointer;\n        background: ',
    ';\n      }\n    '
  ],
  [
    '\n      -webkit-appearance: none;\n      width: 140px;\n      height: 2px;\n      border-radius: 5px;\n      background: #dcdcdc;\n      outline: none;\n      opacity: 0.7;\n      -webkit-transition: 0.2s;\n      transition: opacity 0.2s;\n\n      ::-webkit-slider-thumb {\n        -webkit-appearance: none;\n        appearance: none;\n        width: 15px;\n        height: 15px;\n        border-radius: 50%;\n        cursor: pointer;\n        background: ',
    ';\n      }\n    '
  ]
)

var Slider = function Slider(_ref) {
  var min = _ref.min,
    max = _ref.max,
    value = _ref.value,
    onChange = _ref.onChange,
    color = _ref.color,
    rest = objectWithoutProperties(_ref, [
      'min',
      'max',
      'value',
      'onChange',
      'color'
    ])
  return React.createElement(
    'input',
    _extends(
      {
        className: css(_templateObject$7, color),
        type: 'range',
        min: min,
        max: max,
        value: value,
        onChange: onChange
      },
      rest
    )
  )
}

Slider.defaultProps = {
  value: 0,
  onChange: function onChange() {}
}

Slider.propTypes = {
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
  color: PropTypes.string.isRequired
}

var _createContext = createContext(),
  Provider = _createContext.Provider,
  Consumer = _createContext.Consumer

function styleInject(css$$1, ref) {
  if (ref === void 0) ref = {}
  var insertAt = ref.insertAt

  if (!css$$1 || typeof document === 'undefined') {
    return
  }

  var head = document.head || document.getElementsByTagName('head')[0]
  var style = document.createElement('style')
  style.type = 'text/css'

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild)
    } else {
      head.appendChild(style)
    }
  } else {
    head.appendChild(style)
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css$$1
  } else {
    style.appendChild(document.createTextNode(css$$1))
  }
}

var css$2 =
  ".tooltipped {\n  position: relative;\n}\n.tooltipped::after {\n  position: absolute;\n  z-index: 1000000;\n  display: none;\n  padding: 0.5em 0.75em;\n  font: normal normal 11px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI',\n    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',\n    'Segoe UI Symbol';\n  -webkit-font-smoothing: subpixel-antialiased;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: break-word;\n  white-space: pre;\n  pointer-events: none;\n  content: attr(aria-label);\n  background: #1b1f23;\n  border-radius: 3px;\n  opacity: 0;\n}\n.tooltipped::before {\n  position: absolute;\n  z-index: 1000001;\n  display: none;\n  width: 0;\n  height: 0;\n  color: #1b1f23;\n  pointer-events: none;\n  content: '';\n  border: 6px solid transparent;\n  opacity: 0;\n}\n@keyframes tooltip-appear {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.tooltipped:hover::before,\n.tooltipped:hover::after,\n.tooltipped:active::before,\n.tooltipped:active::after,\n.tooltipped:focus::before,\n.tooltipped:focus::after {\n  display: inline-block;\n  text-decoration: none;\n  animation-name: tooltip-appear;\n  animation-duration: 0.1s;\n  animation-fill-mode: forwards;\n  animation-timing-function: ease-in;\n  animation-delay: 0.4s;\n}\n.tooltipped-no-delay:hover::before,\n.tooltipped-no-delay:hover::after,\n.tooltipped-no-delay:active::before,\n.tooltipped-no-delay:active::after,\n.tooltipped-no-delay:focus::before,\n.tooltipped-no-delay:focus::after {\n  animation-delay: 0s;\n}\n.tooltipped-multiline:hover::after,\n.tooltipped-multiline:active::after,\n.tooltipped-multiline:focus::after {\n  display: table-cell;\n}\n.tooltipped-s::after,\n.tooltipped-se::after,\n.tooltipped-sw::after {\n  top: 100%;\n  right: 50%;\n  margin-top: 6px;\n}\n.tooltipped-s::before,\n.tooltipped-se::before,\n.tooltipped-sw::before {\n  top: auto;\n  right: 50%;\n  bottom: -7px;\n  margin-right: -6px;\n  border-bottom-color: #1b1f23;\n}\n.tooltipped-se::after {\n  right: auto;\n  left: 50%;\n  margin-left: -16px;\n}\n.tooltipped-sw::after {\n  margin-right: -16px;\n}\n.tooltipped-n::after,\n.tooltipped-ne::after,\n.tooltipped-nw::after {\n  right: 50%;\n  bottom: 100%;\n  margin-bottom: 6px;\n}\n.tooltipped-n::before,\n.tooltipped-ne::before,\n.tooltipped-nw::before {\n  top: -7px;\n  right: 50%;\n  bottom: auto;\n  margin-right: -6px;\n  border-top-color: #1b1f23;\n}\n.tooltipped-ne::after {\n  right: auto;\n  left: 50%;\n  margin-left: -16px;\n}\n.tooltipped-nw::after {\n  margin-right: -16px;\n}\n.tooltipped-s::after,\n.tooltipped-n::after {\n  transform: translateX(50%);\n}\n.tooltipped-w::after {\n  right: 100%;\n  bottom: 50%;\n  margin-right: 6px;\n  transform: translateY(50%);\n}\n.tooltipped-w::before {\n  top: 50%;\n  bottom: 50%;\n  left: -7px;\n  margin-top: -6px;\n  border-left-color: #1b1f23;\n}\n.tooltipped-e::after {\n  bottom: 50%;\n  left: 100%;\n  margin-left: 6px;\n  transform: translateY(50%);\n}\n.tooltipped-e::before {\n  top: 50%;\n  right: -7px;\n  bottom: 50%;\n  margin-top: -6px;\n  border-right-color: #1b1f23;\n}\n.tooltipped-align-right-1::after,\n.tooltipped-align-right-2::after {\n  right: 0;\n  margin-right: 0;\n}\n.tooltipped-align-right-1::before {\n  right: 10px;\n}\n.tooltipped-align-right-2::before {\n  right: 15px;\n}\n.tooltipped-align-left-1::after,\n.tooltipped-align-left-2::after {\n  left: 0;\n  margin-left: 0;\n}\n.tooltipped-align-left-1::before {\n  left: 5px;\n}\n.tooltipped-align-left-2::before {\n  left: 10px;\n}\n.tooltipped-multiline::after {\n  width: -webkit-max-content;\n  width: -moz-max-content;\n  width: max-content;\n  max-width: 250px;\n  word-wrap: break-word;\n  white-space: pre-line;\n  border-collapse: separate;\n}\n.tooltipped-multiline.tooltipped-s::after,\n.tooltipped-multiline.tooltipped-n::after {\n  right: auto;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.tooltipped-multiline.tooltipped-w::after,\n.tooltipped-multiline.tooltipped-e::after {\n  right: 100%;\n}\n@media screen and (min-width: 0\\0) {\n  .tooltipped-multiline::after {\n    width: 250px;\n  }\n}\n.tooltipped-sticky::before,\n.tooltipped-sticky::after {\n  display: inline-block;\n}\n.tooltipped-sticky.tooltipped-multiline::after {\n  display: table-cell;\n}\n"
styleInject(css$2)

var _templateObject$8 = taggedTemplateLiteralLoose(
    [
      '\n  display: inline-block;\n  width: 20px;\n  position: relative;\n  top: 5px;\n  left: -5px;\n  color: ',
      ';\n'
    ],
    [
      '\n  display: inline-block;\n  width: 20px;\n  position: relative;\n  top: 5px;\n  left: -5px;\n  color: ',
      ';\n'
    ]
  ),
  _templateObject2$2 = taggedTemplateLiteralLoose(
    ['\n  outline: none;\n'],
    ['\n  outline: none;\n']
  ),
  _templateObject3 = taggedTemplateLiteralLoose(
    ['\n  cursor: pointer;\n  color: ', ';\n'],
    ['\n  cursor: pointer;\n  color: ', ';\n']
  ),
  _templateObject4 = taggedTemplateLiteralLoose(
    [
      '\n  display: inline-block;\n  width: 10px;\n  position: relative;\n  top: 3px;\n  left: 4px;\n  color: ',
      ';\n'
    ],
    [
      '\n  display: inline-block;\n  width: 10px;\n  position: relative;\n  top: 3px;\n  left: 4px;\n  color: ',
      ';\n'
    ]
  )

var StyledIcon = styled('i')(_templateObject$8, function(props) {
  return props.color
})

var StyledSpan = styled('span')(_templateObject2$2)

var ToolsIcon = styled('i')(_templateObject3, function(props) {
  return props.color
})

var StyledLabel = styled('label')(_templateObject4, function(props) {
  return props.color
})

var ENTER_KEY$1 = 13

/* eslint-disable operator-linebreak */
var TOOLTIP_CLASSNAME =
  'tooltipped tooltipped-ne tooltipped-align-left-1 tooltipped-no-delay border p-2 mb-2 mr-2 float-left'

var HOC = function HOC(Comp) {
  return function(props) {
    return React.createElement(Consumer, null, function(color) {
      return React.createElement(Comp, _extends({ color: color }, props))
    })
  }
}

var ColorSaturator = HOC(function(_ref) {
  var color = _ref.color,
    value = _ref.value,
    onChange = _ref.onChange
  return React.createElement(
    StyledSpan,
    { title: 'color saturator' },
    React.createElement(StyledIcon, {
      className: 'fas fa-star-half-alt',
      color: color
    }),
    React.createElement(Slider, {
      min: '10',
      max: '100',
      value: value,
      onChange: onChange,
      color: color
    }),
    React.createElement(StyledLabel, { color: color }, value)
  )
})

var ColorDesaturator = HOC(function(_ref2) {
  var color = _ref2.color,
    value = _ref2.value,
    onChange = _ref2.onChange
  return React.createElement(
    StyledSpan,
    { title: 'color desaturator' },
    React.createElement(StyledIcon, { className: 'fas fa-fill', color: color }),
    React.createElement(Slider, {
      min: '10',
      max: '100',
      value: value,
      onChange: onChange,
      color: color
    }),
    React.createElement(StyledLabel, { color: color }, value)
  )
})

var ColorBrightener = HOC(function(_ref3) {
  var color = _ref3.color,
    value = _ref3.value,
    onChange = _ref3.onChange
  return React.createElement(
    StyledSpan,
    { title: 'color brightener' },
    React.createElement(StyledIcon, { className: 'fas fa-sun', color: color }),
    React.createElement(Slider, {
      min: '10',
      max: '100',
      value: value,
      onChange: onChange,
      color: color
    }),
    React.createElement(StyledLabel, { color: color }, value)
  )
})

var ColorDarkener = HOC(function(_ref4) {
  var color = _ref4.color,
    value = _ref4.value,
    onChange = _ref4.onChange
  return React.createElement(
    StyledSpan,
    { title: 'color darkener' },
    React.createElement(StyledIcon, { className: 'fas fa-moon', color: color }),
    React.createElement(Slider, {
      min: '10',
      max: '100',
      value: value,
      onChange: onChange,
      color: color
    }),
    React.createElement(StyledLabel, { color: color }, value)
  )
})

var ColorSpinner = HOC(function(_ref5) {
  var color = _ref5.color,
    onChange = _ref5.onChange,
    value = _ref5.value
  return React.createElement(
    StyledSpan,
    { title: 'color spin' },
    React.createElement(StyledIcon, {
      className: 'fas fa-sync-alt',
      color: color
    }),
    React.createElement(Slider, {
      min: '-360',
      max: '360',
      value: value,
      onChange: onChange,
      color: color
    }),
    React.createElement(
      StyledLabel,
      { color: color },
      value,
      React.createElement('sup', null, '\xB0')
    )
  )
})

var ImagePicker = HOC(function(_ref6) {
  var color = _ref6.color,
    uploadImage = _ref6.uploadImage
  return React.createElement(
    StyledSpan,
    { title: 'Image picker' },
    React.createElement('input', {
      id: 'uploader',
      style: { display: 'none' },
      type: 'file',
      accept: 'image/*',
      onChange: uploadImage
    }),
    React.createElement(ToolsIcon, {
      id: 'image-icon',
      className: 'fas fa-image',
      color: color
    })
  )
})

ImagePicker.propTypes = {
  color: PropTypes.string,
  uploadImage: PropTypes.func
}

var PaletteGenerator = HOC(function(_ref7) {
  var color = _ref7.color,
    generateSwatches = _ref7.generateSwatches
  return React.createElement(
    StyledSpan,
    {
      tabIndex: 0,
      title: 'Palette generator',
      onClick: generateSwatches,
      onKeyDown: function onKeyDown(e) {
        return e.keyCode === ENTER_KEY$1 ? generateSwatches(e) : null
      }
    },
    React.createElement(ToolsIcon, {
      className: 'fas fa-palette',
      color: color
    })
  )
})

PaletteGenerator.propTypes = {
  color: PropTypes.string,
  generateSwatches: PropTypes.func
}

var ShadesGenerator = HOC(function(_ref8) {
  var color = _ref8.color,
    generateShades = _ref8.generateShades
  return React.createElement(
    StyledSpan,
    {
      tabIndex: 0,
      title: 'shade picker',
      onClick: generateShades,
      onKeyDown: function onKeyDown(e) {
        return e.keyCode === ENTER_KEY$1 ? generateShades(e) : null
      }
    },
    React.createElement(ToolsIcon, { className: 'fas fa-adjust', color: color })
  )
})

ShadesGenerator.propTypes = {
  color: PropTypes.string,
  generateShades: PropTypes.func
}

var Reset = HOC(function(_ref9) {
  var color = _ref9.color,
    resetColors = _ref9.resetColors
  return React.createElement(
    StyledSpan,
    {
      tabIndex: 0,
      title: 'reset colors',
      onClick: resetColors,
      onKeyDown: function onKeyDown(e) {
        return e.keyCode === ENTER_KEY$1 ? resetColors(e) : null
      }
    },
    React.createElement(ToolsIcon, {
      className: 'fas fa-arrow-alt-circle-left',
      color: color
    })
  )
})

Reset.propTypes = {
  color: PropTypes.string,
  resetColors: PropTypes.func
}

var TintsGenerator = HOC(function(_ref10) {
  var color = _ref10.color,
    generateTints = _ref10.generateTints
  return React.createElement(
    StyledSpan,
    {
      tabIndex: 0,
      title: 'tint picker',
      onClick: generateTints,
      onKeyDown: function onKeyDown(e) {
        return e.keyCode === ENTER_KEY$1 ? generateTints(e) : null
      }
    },
    React.createElement(ToolsIcon, { className: 'fas fa-tint', color: color })
  )
})

TintsGenerator.propTypes = {
  color: PropTypes.string,
  generateTints: PropTypes.func
}

var Clipboard = HOC(function(_ref11) {
  var color = _ref11.color,
    copyColor = _ref11.copyColor,
    showMsg = _ref11.showMsg,
    _ref11$id = _ref11.id,
    id = _ref11$id === undefined ? 'clipboard' : _ref11$id
  return React.createElement(
    StyledSpan,
    {
      tabIndex: 0,
      id: id,
      onClick: copyColor,
      onKeyDown: function onKeyDown(e) {
        return e.keyCode === ENTER_KEY$1 ? copyColor(e) : null
      },
      className: showMsg ? TOOLTIP_CLASSNAME : 'no-tooltip',
      'aria-label': 'Copied'
    },
    React.createElement(ToolsIcon, { className: 'fas fa-copy', color: color })
  )
})

Clipboard.propTypes = {
  color: PropTypes.string,
  copyColor: PropTypes.func,
  showMsg: PropTypes.bool,
  id: PropTypes.string
}

var GradientGenerator = HOC(function(_ref12) {
  var color = _ref12.color,
    generateGradient = _ref12.generateGradient
  return React.createElement(
    StyledSpan,
    {
      tabIndex: 0,
      onClick: generateGradient,
      title: 'Gradient generator',
      onKeyDown: function onKeyDown(e) {
        return e.keyCode === ENTER_KEY$1 ? generateGradient(e) : null
      }
    },
    React.createElement(ToolsIcon, {
      className: 'fas fa-redo-alt',
      color: color
    })
  )
})

GradientGenerator.propTypes = {
  color: PropTypes.string,
  generateGradient: PropTypes.func
}

var AdvanceTools = {
  ColorSaturator: ColorSaturator,
  ColorDesaturator: ColorDesaturator,
  ColorBrightener: ColorBrightener,
  ColorDarkener: ColorDarkener,
  ColorSpinner: ColorSpinner
}

Object.keys(AdvanceTools).forEach(function(tool) {
  AdvanceTools[tool].propTypes = {
    color: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func
  }
})

var BasicTools = {
  TintsGenerator: TintsGenerator,
  ShadesGenerator: ShadesGenerator,
  Reset: Reset,
  ImagePicker: ImagePicker,
  PaletteGenerator: PaletteGenerator,
  Clipboard: Clipboard,
  GradientGenerator: GradientGenerator
}

// DARK THEME
var DARK_COLOR = '#1f1f1f'
// LIGHT THEME
var LIGHT_COLOR = 'rgb(255, 255, 255)'
// DEFAULT GRADIENT COLOR ONE
var DEFAULT_COLOR_ONE = '#81FFEF'
// DEFAULT GRADIENT COLOR TWO
var DEFAULT_COLOR_TWO = '#F067B4'
// GRADIENT CONTAINER WIDTH
var GRADIENT_CONTAINER_WIDTH = '170px'
// GRADIENT CONTAINER HEIGHT
var GRADIENT_CONTAINER_HEIGHT = '295px'
var DEFAULT_SWATCHES = [
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
var DEFAULT_COLOR = '#088da5'
// REQUIRED FOR GENERATING SWATCHES FROM AN IMAGE
var MAX_COLORS = 64
// WIDTH OF THE COLOR PICKER
var COLOR_CONTAINER_WIDTH = '228px'
// HEIGHT OF THE COLOR PICKER
var COLOR_CONTAINER_HEIGHT = '295px'
// DEFAULT COLOR STOP POSITION
var DEFAULT_COLOR_STOP = 0.2
// WIDTH OF SCHEME PICKER
var SCHEME_CONTAINER_WIDTH = '200px'
// HEIGHT OF SCHEME PICKER
var SCHEME_CONTAINER_HEIGHT = '225px'

var getThemeVariants = function getThemeVariants(theme) {
  return {
    bg: theme === 'dark' ? DARK_COLOR : LIGHT_COLOR,
    iconColor: theme === 'dark' ? LIGHT_COLOR : DARK_COLOR
  }
}

var _templateObject$9 = taggedTemplateLiteralLoose(
    [
      '\n  display: grid;\n  justify-content: center;\n  grid-template-columns: 1fr;\n  grid-gap: 15px;\n  list-style: none;\n  margin-left: -28px;\n'
    ],
    [
      '\n  display: grid;\n  justify-content: center;\n  grid-template-columns: 1fr;\n  grid-gap: 15px;\n  list-style: none;\n  margin-left: -28px;\n'
    ]
  ),
  _templateObject2$3 = taggedTemplateLiteralLoose(
    [
      '\n  display: grid;\n  grid-template-columns: ',
      ';\n  grid-gap: ',
      ';\n  margin-right: -20px;\n  margin-top: 20px;\n'
    ],
    [
      '\n  display: grid;\n  grid-template-columns: ',
      ';\n  grid-gap: ',
      ';\n  margin-right: -20px;\n  margin-top: 20px;\n'
    ]
  )

var StyledList = styled('ul')(_templateObject$9)

var ToolsContainer = styled('div')(
  _templateObject2$3,
  function(props) {
    return 'repeat(' + (props.columns || 6) + ', ' + (props.size || '1fr') + ')'
  },
  function(props) {
    return props.gap || '5px'
  }
)

var BasicPicker = (function(_React$PureComponent) {
  inherits(BasicPicker, _React$PureComponent)

  function BasicPicker() {
    var _temp, _this, _ret

    classCallCheck(this, BasicPicker)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = possibleConstructorReturn(
        this,
        _React$PureComponent.call.apply(
          _React$PureComponent,
          [this].concat(args)
        )
      )),
      _this)),
      (_this.imageIcon = null),
      (_this.uploadElement = null),
      (_this.clipboardIcon = null),
      (_this.state = {
        // Current block, active and input field color (or hue)
        color: new TinyColor(_this.props.color),
        // Current swatches to be displayed in picker
        swatches: _this.props.swatches,
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
      }),
      (_this.brightenColor = null),
      (_this.darkenColor = null),
      (_this.spinColor = null),
      (_this.desaturateColor = null),
      (_this.saturateColor = null),
      (_this.hideMsg = function() {
        return _this.setState({ showMsg: false })
      }),
      (_this.defaultOnChange = function(color) {
        var newColor = new TinyColor(color)

        if (newColor.isValid) {
          _this.setState({ color: newColor })
        }
      }),
      (_this.updateColorState = function(value, color, operation) {
        var _this$setState

        var newValue = parseInt(value)
        var newColor = new TinyColor(color)[operation](newValue)

        _this.props.onChange && _this.props.onChange(newColor.toHexString())
        _this.setState(
          ((_this$setState = {}),
          (_this$setState[operation] = newValue),
          (_this$setState.color = newColor),
          _this$setState)
        )
      }),
      (_this.clearAllColorBuffers = function() {
        _this.spinColor = null
        _this.saturateColor = null
        _this.desaturateColor = null
        _this.darkenColor = null
        _this.brightenColor = null
      }),
      (_this.handleSpin = function(e) {
        if (_this.spinColor === null) {
          _this.spinColor = _this.state.color.originalInput
        }

        _this.saturateColor = null
        _this.desaturateColor = null
        _this.brightenColor = null
        _this.darkenColor = null

        _this.updateColorState(e.target.value, _this.spinColor, 'spin')
      }),
      (_this.handleSaturate = function(e) {
        if (_this.saturateColor === null) {
          _this.saturateColor = _this.state.color.originalInput
        }

        _this.spinColor = null
        _this.desaturateColor = null
        _this.brightenColor = null
        _this.darkenColor = null

        _this.updateColorState(e.target.value, _this.saturateColor, 'saturate')
      }),
      (_this.handleDesaturate = function(e) {
        if (_this.desaturateColor === null) {
          _this.desaturateColor = _this.state.color.originalInput
        }

        _this.saturateColor = null
        _this.spinColor = null
        _this.brightenColor = null
        _this.darkenColor = null

        _this.updateColorState(
          e.target.value,
          _this.desaturateColor,
          'desaturate'
        )
      }),
      (_this.handleBrighten = function(e) {
        if (_this.brightenColor === null) {
          _this.brightenColor = _this.state.color.originalInput
        }

        _this.saturateColor = null
        _this.desaturateColor = null
        _this.spinColor = null
        _this.darkenColor = null

        _this.updateColorState(e.target.value, _this.brightenColor, 'brighten')
      }),
      (_this.handleDarken = function(e) {
        if (_this.darkenColor === null) {
          _this.darkenColor = _this.state.color.originalInput
        }

        _this.saturateColor = null
        _this.desaturateColor = null
        _this.brightenColor = null
        _this.spinColor = null

        _this.updateColorState(e.target.value, _this.darkenColor, 'darken')
      }),
      (_this.getColor = function(color) {
        return {
          HSL: color.toHslString(),
          HEX: color.toHexString(),
          RGB: color.toRgbString(),
          HSV: color.toHsvString()
        }
      }),
      (_this.updateKey = function(e) {
        if (e.which === 8) {
          // Remove the image from color block
          _this.setState({ image: null })
        }
      }),
      (_this.simulateClick = function(e) {
        if (_this.uploadElement) {
          _this.uploadElement.click()
        }

        e.preventDefault()
      }),
      (_this.generateSwatches = function() {
        var i = 0

        // Each swatch should be different
        var newColors = new Set()

        while (i < 12) {
          newColors.add(generateColors())
          i += 1
        }

        // Hide shades and tints when new swatches are added
        _this.setState({
          swatches: [].concat(newColors),
          showShades: false,
          showTints: false,
          tints: [],
          shades: []
        })
      }),
      (_this.uploadImage = function(e) {
        return _this.setState({
          image: window.URL.createObjectURL(e.target.files[0])
        })
      }),
      (_this.updateSwatch = function(color) {
        // If tools are active, then reset color instance properties.
        if (_this.props.showTools) {
          _this.clearAllColorBuffers()

          _this.setState({
            color: new TinyColor(color),
            // Reset all the values for the newly selected swatch
            spin: 0,
            saturate: 0,
            desaturate: 0,
            darken: 0,
            brighten: 0
          })
        } else {
          _this.setState({
            color: new TinyColor(color)
          })
        }

        _this.props.onChange && _this.props.onChange(color)
      }),
      (_this.updateSwatches = function(swatches) {
        return _this.setState({
          swatches: [].concat(swatches),
          // Also update the current color
          color: new TinyColor(swatches[0]),
          // Hide the shades and tints
          showShades: false,
          showTints: false,
          tints: [],
          shades: []
        })
      }),
      (_this.generateSwatchesFromHue = function(term, showShades, showTints) {
        var _this$setState2

        var colorBuffer = []
        var color = new Values(_this.state.color.toHexString())

        color[term]().forEach(function(c) {
          return colorBuffer.push(c.hexString())
        })

        _this.setState(
          ((_this$setState2 = {}),
          (_this$setState2[term] = [].concat(colorBuffer)),
          (_this$setState2.showShades = showShades),
          (_this$setState2.showTints = showTints),
          _this$setState2)
        )
      }),
      (_this.generateShades = function() {
        return _this.generateSwatchesFromHue('shades', true, false)
      }),
      (_this.generateTints = function() {
        return _this.generateSwatchesFromHue('tints', false, true)
      }),
      (_this.changeFormat = function(e) {
        return _this.setState({ currentFormat: e.target.value })
      }),
      (_this.resetColors = function() {
        return _this.setState({
          shades: [],
          tints: [],
          showShades: false,
          showTints: false
        })
      }),
      (_this.copyColor = function() {
        var _this$state = _this.state,
          color = _this$state.color,
          currentFormat = _this$state.currentFormat

        var activeColor = _this.getColor(color)[currentFormat]

        clipboard.writeText(activeColor)
        _this.setState({ showMsg: true })
      }),
      _temp)),
      possibleConstructorReturn(_this, _ret)
    )
  }
  // Image upload icon

  // Hidden input element for uploading an image

  // Clipboard icon

  // Instance properties are used to store the color state on
  // which the color operations will be applied.

  BasicPicker.prototype.componentDidMount = function componentDidMount() {
    this.uploadElement = document.getElementById('uploader')
    this.imageIcon = document.getElementById('image-icon')
    this.clipboardIcon = document.getElementById('clipboard')

    this.imageIcon.addEventListener('click', this.simulateClick)
    this.clipboardIcon.addEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.addEventListener('blur', this.hideMsg)

    // Attach a listener for deleting the image (if any) from the color block
    document.addEventListener('keydown', this.updateKey)
  }

  BasicPicker.prototype.componentDidUpdate = function componentDidUpdate(
    prevProps
  ) {
    if (prevProps.color !== this.props.color) {
      var color = new TinyColor(this.props.color)
      // Check if its a valid hex and then update the color
      // on changing the color input field, it only updates the color block if the hex code is valid
      if (color.isValid) {
        this.setState({ color: color })
      }
    }
  }

  BasicPicker.prototype.componentWillUnmount = function componentWillUnmount() {
    this.imageIcon.removeEventListener('click', this.simulateClick)
    this.clipboardIcon.removeEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.removeEventListener('blur', this.hideMsg)
    document.removeEventListener('keydown', this.updateKey)
  }

  // default onChange handler for color input field

  /**
   * Below methods are used to handle color operations. Whenever an
   * operation is performed on a color, it mutates the original state
   * of the color. So we use instance properties to clear and set the
   * currently active color state, and then apply the color operations
   * w.r.t to the instance property (or current color value)
   *
   * TODO: Refactor this mess
   */

  // outputs the color according to the color format

  // This handler is used to update the image state. After the colors
  // are extracted from the image, a image can be removed from the color block.

  // Randomly generate new swatches

  // Updates the hue state

  // Handler to update swatches when colors are extracted from an image

  // Generates shades or tints from the currently selected hue (color)

  // Shades - A hue lightened with white

  // Tints - A hue darkened with black

  // Update the color format (hsv, rgb, hex, or hsl)

  // Reset the shades and tints, and displays the previous swatches

  BasicPicker.prototype.render = function render() {
    var _state = this.state,
      image = _state.image,
      swatches = _state.swatches,
      shades = _state.shades,
      showShades = _state.showShades,
      showTints = _state.showTints,
      tints = _state.tints,
      currentFormat = _state.currentFormat,
      darken = _state.darken,
      brighten = _state.brighten,
      spin = _state.spin,
      desaturate = _state.desaturate,
      saturate = _state.saturate,
      formats = _state.formats
    // Get the color string with a specified color format

    var color = this.getColor(this.state.color)[currentFormat]

    var _getThemeVariants = getThemeVariants(this.props.theme),
      bg = _getThemeVariants.bg,
      iconColor = _getThemeVariants.iconColor

    return React.createElement(
      Container,
      {
        background: bg,
        width: COLOR_CONTAINER_WIDTH,
        height: COLOR_CONTAINER_HEIGHT
      },
      this.props.triangle &&
        image === null &&
        React.createElement(Triangle, {
          color: this.state.color.toHexString()
        }),
      image === null
        ? React.createElement(ColorBlock, {
            colorState: this.state.color,
            color: color,
            currentFormat: currentFormat
          })
        : React.createElement(Image, { src: image }),
      image &&
        React.createElement(ColorExtractor, {
          maxColors: this.props.maxColors,
          src: image,
          getColors: this.updateSwatches
        }),
      React.createElement(
        'div',
        { style: { padding: 10 } },
        showShades
          ? React.createElement(Swatches, {
              swatches: shades,
              updateSwatch: this.updateSwatch,
              onSwatchHover: this.props.onSwatchHover
            })
          : showTints
            ? React.createElement(Swatches, {
                swatches: tints,
                updateSwatch: this.updateSwatch,
                onSwatchHover: this.props.onSwatchHover
              })
            : React.createElement(Swatches, {
                swatches: swatches,
                updateSwatch: this.updateSwatch,
                onSwatchHover: this.props.onSwatchHover
              }),
        React.createElement(ColorInputField, {
          value: color,
          onChange: this.props.onChange || this.defaultOnChange
        }),
        React.createElement(ColorFormatPicker, {
          changeFormat: this.changeFormat,
          formats: formats
        }),
        React.createElement(
          Provider,
          { value: iconColor },
          React.createElement(
            ToolsContainer,
            null,
            React.createElement(BasicTools.ImagePicker, {
              uploadImage: this.uploadImage
            }),
            React.createElement(BasicTools.PaletteGenerator, {
              generateSwatches: this.generateSwatches
            }),
            React.createElement(BasicTools.TintsGenerator, {
              generateTints: this.generateTints
            }),
            React.createElement(BasicTools.ShadesGenerator, {
              generateShades: this.generateShades
            }),
            React.createElement(BasicTools.Clipboard, {
              copyColor: this.copyColor,
              showMsg: this.state.showMsg
            }),
            React.createElement(BasicTools.Reset, {
              resetColors: this.resetColors
            })
          )
        ),
        this.props.showTools
          ? React.createElement(
              'div',
              null,
              React.createElement(
                Provider,
                { value: iconColor },
                React.createElement(
                  StyledList,
                  null,
                  React.createElement(
                    'li',
                    null,
                    React.createElement(AdvanceTools.ColorSpinner, {
                      value: spin,
                      onChange: this.handleSpin
                    })
                  ),
                  React.createElement(
                    'li',
                    null,
                    React.createElement(AdvanceTools.ColorSaturator, {
                      value: saturate,
                      onChange: this.handleSaturate
                    })
                  ),
                  React.createElement(
                    'li',
                    null,
                    React.createElement(AdvanceTools.ColorDesaturator, {
                      value: desaturate,
                      onChange: this.handleDesaturate
                    })
                  ),
                  React.createElement(
                    'li',
                    null,
                    React.createElement(AdvanceTools.ColorDarkener, {
                      value: darken,
                      onChange: this.handleDarken
                    })
                  ),
                  React.createElement(
                    'li',
                    null,
                    React.createElement(AdvanceTools.ColorBrightener, {
                      value: brighten,
                      onChange: this.handleBrighten
                    })
                  )
                )
              )
            )
          : null
      )
    )
  }

  return BasicPicker
})(React.PureComponent)

BasicPicker.defaultProps = {
  color: DEFAULT_COLOR,
  swatches: DEFAULT_SWATCHES,
  // Max amount of colors from which palettes will be generated (from the image)
  maxColors: MAX_COLORS,
  triangle: true,
  theme: 'light',
  // Color tools are disabled by default
  showTools: false
}
BasicPicker.propTypes = {
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

var _templateObject$a = taggedTemplateLiteralLoose(
    [
      '\n  display: inline-block;\n  width: 80px;\n  position: relative;\n  top: 3px;\n  left: 4px;\n  font-size: 14px;\n  margin-bottom: 5px;\n  color: ',
      ';\n'
    ],
    [
      '\n  display: inline-block;\n  width: 80px;\n  position: relative;\n  top: 3px;\n  left: 4px;\n  font-size: 14px;\n  margin-bottom: 5px;\n  color: ',
      ';\n'
    ]
  ),
  _templateObject2$4 = taggedTemplateLiteralLoose(
    [
      '\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      position: relative;\n      height: 110px;\n      border-radius: 6px 6px 0px 0px;\n    '
    ],
    [
      '\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      position: relative;\n      height: 110px;\n      border-radius: 6px 6px 0px 0px;\n    '
    ]
  ),
  _templateObject3$1 = taggedTemplateLiteralLoose(
    [
      '\n                display: flex;\n                justify-content: center;\n                margin-top: 10px;\n              '
    ],
    [
      '\n                display: flex;\n                justify-content: center;\n                margin-top: 10px;\n              '
    ]
  )

var StyledLabel$1 = styled('label')(_templateObject$a, function(props) {
  return props.color
})

// Colors should be sorted by the color stops position values
var createGradient = function createGradient(colors) {
  return gradient(
    colors.sort(function(a, b) {
      // We need to shift the value of either color stop because tinygradient
      // throws an error when two stops are equal.
      if (a.pos && b.pos && a.pos === b.pos) {
        /* eslint-disable no-param-reassign */
        a.pos += 0.01
      }

      return a.pos - b.pos
    })
  )
}

var ColorBlock$1 = function ColorBlock(_ref) {
  var gradientCss = _ref.gradient
  return React.createElement('div', {
    className: css$1(_templateObject2$4),
    style: { backgroundImage: gradientCss }
  })
}

ColorBlock$1.propTypes = {
  gradient: PropTypes.string.isRequired
}

var ColorStop = function ColorStop(_ref2) {
  var inputColor = _ref2.color,
    onChangeColor = _ref2.onChangeColor,
    value = _ref2.value,
    onChangeStop = _ref2.onChangeStop
  return React.createElement(Consumer, null, function(color) {
    return React.createElement(
      'div',
      null,
      React.createElement(ColorInputField, {
        value: inputColor,
        onChange: onChangeColor
      }),
      React.createElement(
        'span',
        null,
        React.createElement(
          StyledLabel$1,
          { color: color, className: 'label' },
          'Stops'
        ),
        React.createElement(Slider, {
          min: '0',
          max: '10',
          step: '0.01',
          value: value,
          onChange: onChangeStop,
          color: color,
          style: { marginTop: 10, marginBottom: 10 }
        })
      )
    )
  })
}

ColorStop.propTypes = {
  color: PropTypes.string.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  onChangeStop: PropTypes.func.isRequired
}

var GradientPicker = (function(_React$Component) {
  inherits(GradientPicker, _React$Component)

  function GradientPicker() {
    var _temp, _this, _ret

    classCallCheck(this, GradientPicker)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = possibleConstructorReturn(
        this,
        _React$Component.call.apply(_React$Component, [this].concat(args))
      )),
      _this)),
      (_this.clipboardIcon = null),
      (_this.state = {
        // Returns a gradient object
        gradient: _this.props.reverse
          ? gradient(_this.props.colorOne, _this.props.colorTwo).reverse()
          : gradient(_this.props.colorOne, _this.props.colorTwo),
        // Default colors for creating a gradient
        colorOne: _this.props.colorOne,
        colorTwo: _this.props.colorTwo,
        // Color stops are stopping points in a gradient that show a specific color
        // at the exact location we set.
        // Stop loc. for color one
        colorStopOne: 0,
        // Stop loc. for color two
        colorStopTwo: 0,
        // Show copy msg
        showMsg: false
      }),
      (_this.hideMsg = function() {
        return _this.setState({ showMsg: false })
      }),
      (_this.setColorStopOne = function(pos) {
        // Only set the stop property if it's non-zero
        /* eslint-disable operator-linebreak */

        var colorOne =
          pos !== 0
            ? { color: _this.state.colorOne, pos: pos }
            : _this.state.colorOne
        var colorTwo =
          pos !== 0
            ? { color: _this.state.colorTwo, pos: DEFAULT_COLOR_STOP }
            : _this.state.colorTwo

        return {
          colorOne: colorOne,
          colorTwo: colorTwo
        }
      }),
      (_this.setColorStopTwo = function(pos) {
        /* eslint-disable operator-linebreak */
        var colorOne =
          pos !== 0
            ? { color: _this.state.colorOne, pos: DEFAULT_COLOR_STOP }
            : _this.state.colorOne

        var colorTwo =
          pos !== 0
            ? { color: _this.state.colorTwo, pos: pos }
            : _this.state.colorTwo

        return {
          colorOne: colorOne,
          colorTwo: colorTwo
        }
      }),
      (_this.propCallback = function() {
        return _this.props.reverse
          ? _this.props.getGradient(
              _this.state.gradient
                .reverse()
                .css(_this.props.mode, _this.props.direction)
            )
          : _this.props.getGradient(
              _this.state.gradient.css(_this.props.mode, _this.props.direction)
            )
      }),
      (_this.updateColorStop = function(e, color) {
        var value = parseInt(e.target.value)
        // color stop position value should be between 0 and 1
        var pos = _this.state[color] / 10

        // Create the gradient depending on the color stop value and color state
        if (color === 'colorStopOne') {
          var _this$setState

          var _this$setColorStopOne = _this.setColorStopOne(pos),
            colorOne = _this$setColorStopOne.colorOne,
            colorTwo = _this$setColorStopOne.colorTwo

          _this.setState(
            ((_this$setState = {
              gradient: createGradient([colorOne, colorTwo])
            }),
            (_this$setState[color] = value),
            _this$setState),
            _this.propCallback
          )
        } else if (color === 'colorStopTwo') {
          var _this$setState2

          var _this$setColorStopTwo = _this.setColorStopTwo(pos),
            _colorOne = _this$setColorStopTwo.colorOne,
            _colorTwo = _this$setColorStopTwo.colorTwo

          _this.setState(
            ((_this$setState2 = {
              gradient: createGradient([_colorOne, _colorTwo])
            }),
            (_this$setState2[color] = value),
            _this$setState2),
            _this.propCallback
          )
        }
      }),
      (_this.updateStopOne = function(e) {
        return _this.updateColorStop(e, 'colorStopOne')
      }),
      (_this.updateStopTwo = function(e) {
        return _this.updateColorStop(e, 'colorStopTwo')
      }),
      (_this.updateColorOne = function(color) {
        _this.setState({ colorOne: color })

        var newColor = new TinyColor(color)

        if (newColor.isValid) {
          _this.setState(function(state) {
            return {
              gradient: gradient(color, state.colorTwo)
            }
          }, _this.propCallback)
        }
      }),
      (_this.updateColorTwo = function(color) {
        _this.setState({ colorTwo: color })

        var newColor = new TinyColor(color)

        if (newColor.isValid) {
          _this.setState(function(state) {
            return {
              gradient: gradient(state.colorOne, color)
            }
          }, _this.propCallback)
        }
      }),
      (_this.generateGradient = function() {
        var iterator = randomColors().values()

        var colorOne = iterator.next().value
        var colorTwo = iterator.next().value

        _this.setState(
          {
            colorOne: colorOne,
            colorTwo: colorTwo,
            gradient: gradient(colorOne, colorTwo)
          },
          _this.propCallback
        )
      }),
      (_this.copyColor = function() {
        clipboard.writeText(_this.state.gradient.css())
        _this.setState({ showMsg: true })
      }),
      _temp)),
      possibleConstructorReturn(_this, _ret)
    )
  }
  // Clipboard icon element

  GradientPicker.prototype.componentDidMount = function componentDidMount() {
    this.propCallback()

    this.clipboardIcon = document.getElementById('gradient-clipboard')

    this.clipboardIcon.addEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.addEventListener('blur', this.hideMsg)
  }

  GradientPicker.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clipboardIcon.removeEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.removeEventListener('blur', this.hideMsg)
  }

  /* eslint-disable indent */

  // Create the gradient when the color stop value for color changes

  // Create the gradient when the either color changes

  // Generate different color inputs and create a gradient using those input values

  GradientPicker.prototype.render = function render() {
    var _state = this.state,
      grad = _state.gradient,
      colorOne = _state.colorOne,
      colorTwo = _state.colorTwo,
      colorStopOne = _state.colorStopOne,
      colorStopTwo = _state.colorStopTwo,
      showMsg = _state.showMsg

    var _getThemeVariants = getThemeVariants(this.props.theme),
      bg = _getThemeVariants.bg,
      iconColor = _getThemeVariants.iconColor

    return React.createElement(
      Container,
      {
        background: bg,
        width: GRADIENT_CONTAINER_WIDTH,
        height: GRADIENT_CONTAINER_HEIGHT
      },
      React.createElement(ColorBlock$1, { gradient: grad.css() }),
      React.createElement(
        Provider,
        { value: iconColor },
        React.createElement(
          'div',
          { style: { padding: 10 } },
          React.createElement(ColorStop, {
            color: colorOne,
            value: colorStopOne,
            onChangeColor: this.updateColorOne,
            onChangeStop: this.updateStopOne
          }),
          React.createElement(ColorStop, {
            color: colorTwo,
            value: colorStopTwo,
            onChangeColor: this.updateColorTwo,
            onChangeStop: this.updateStopTwo
          }),
          React.createElement(
            'div',
            {
              className: css$1(_templateObject3$1)
            },
            React.createElement(BasicTools.Clipboard, {
              id: 'gradient-clipboard',
              showMsg: showMsg,
              copyColor: this.copyColor
            }),
            React.createElement(
              'div',
              { style: { marginLeft: 10 } },
              React.createElement(BasicTools.GradientGenerator, {
                generateGradient: this.generateGradient
              })
            )
          )
        )
      )
    )
  }

  return GradientPicker
})(React.Component)

GradientPicker.defaultProps = {
  colorOne: DEFAULT_COLOR_ONE,
  colorTwo: DEFAULT_COLOR_TWO,
  // When set to true, reverse the gradient
  reverse: false,
  // Returns a css gradient string. It is invoked on every operation like
  // (setting stop values, or updating the color input field)
  /* eslint-disable no-unused-vars */
  getGradient: function getGradient(grad) {},
  theme: 'light',
  // These defaults are built-in in tinygradient module
  mode: 'linear',
  direction: 'to top'
}
GradientPicker.propTypes = {
  colorOne: PropTypes.string,
  colorTwo: PropTypes.string,
  getGradient: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark']),
  /* eslint-disable react/require-default-props */
  mode: PropTypes.oneOf(['linear', 'radial']),
  direction: PropTypes.string,
  reverse: PropTypes.bool
}

var _templateObject$b = taggedTemplateLiteralLoose(
    [
      '\n      background: ',
      ';\n      width: 25px;\n      height: 25px;\n    '
    ],
    ['\n      background: ', ';\n      width: 25px;\n      height: 25px;\n    ']
  ),
  _templateObject2$5 = taggedTemplateLiteralLoose(
    [
      '\n      display: grid;\n      grid-template-columns: repeat(30, 25px);\n      grid-gap: 1px;\n      margin-top: 10px;\n      overflow-x: auto;\n      width: 100%;\n      height: 34px;\n    '
    ],
    [
      '\n      display: grid;\n      grid-template-columns: repeat(30, 25px);\n      grid-gap: 1px;\n      margin-top: 10px;\n      overflow-x: auto;\n      width: 100%;\n      height: 34px;\n    '
    ]
  )

var ENTER_KEY$2 = 13

var Swatch$1 = function Swatch(_ref) {
  var color = _ref.color,
    updateSwatch = _ref.updateSwatch
  return React.createElement('div', {
    className: css(_templateObject$b, color),
    onClick: function onClick() {
      return updateSwatch(color)
    },
    onKeyDown: function onKeyDown(e) {
      return e.keyCode === ENTER_KEY$2 ? updateSwatch(color) : null
    }
  })
}

Swatch$1.propTypes = {
  color: PropTypes.string.isRequired,
  updateSwatch: PropTypes.func.isRequired
}

var CompactSwatches = function CompactSwatches(_ref2) {
  var schemes = _ref2.schemes,
    updateSwatch = _ref2.updateSwatch
  return React.createElement(
    'div',
    {
      className: css(_templateObject2$5)
    },
    schemes.map(function(scheme) {
      return React.createElement(Swatch$1, {
        updateSwatch: updateSwatch,
        color: scheme,
        key: scheme
      })
    })
  )
}

CompactSwatches.propTypes = {
  schemes: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateSwatch: PropTypes.func.isRequired
}

var _templateObject$c = taggedTemplateLiteralLoose(
  [
    '\n                display: flex;\n                justify-content: center;\n                margin-top: 10px;\n              '
  ],
  [
    '\n                display: flex;\n                justify-content: center;\n                margin-top: 10px;\n              '
  ]
)

var MAX_COLOR_SCHEMES = 30

var SchemePicker = (function(_React$Component) {
  inherits(SchemePicker, _React$Component)

  function SchemePicker() {
    var _temp, _this, _ret

    classCallCheck(this, SchemePicker)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = possibleConstructorReturn(
        this,
        _React$Component.call.apply(_React$Component, [this].concat(args))
      )),
      _this)),
      (_this.clipboardIcon = null),
      (_this.state = {
        color: new TinyColor(_this.props.color).toHexString(),
        swatches: [],
        showMsg: false
      }),
      (_this.hideMsg = function() {
        return _this.setState({ showMsg: false })
      }),
      (_this.generateSchemes = function(color) {
        var newSchemes = new TinyColor(color)
          [
            /* eslint-disable no-unexpected-multiline */
            _this.props.scheme
          ](MAX_COLOR_SCHEMES) // the max color scheme amount will be adjusted by TinyColor for different color schemes
          /* eslint-disable max-len */
          .map(function(c) {
            return c.toHexString()
          }) // Get the hex string of each color
          .reverse() // We have to display the colors from light to dark, so reverse the color schemes.

        // All the color schemes should be unique
        var uniqueSchemes = new Set()

        newSchemes.forEach(function(scheme) {
          return uniqueSchemes.add(scheme)
        })
        _this.setState({ swatches: [].concat(uniqueSchemes) })
      }),
      (_this.updateSwatch = function(color) {
        _this.setState({ color: color })

        // Invoke the prop callback
        _this.props.onChange && _this.props.onChange(color)
      }),
      (_this.defaultOnChange = function(color) {
        var newColor = new TinyColor(color)

        if (newColor.isValid) {
          // Update the color input value
          // Also generate the new schemes based on the new color input
          _this.setState({ color: newColor.toHexString() }, function() {
            return _this.generateSchemes(color)
          })
        }
      }),
      (_this.copyColor = function() {
        clipboard.writeText(_this.state.color)
        _this.setState({ showMsg: true })
      }),
      _temp)),
      possibleConstructorReturn(_this, _ret)
    )
  }

  SchemePicker.prototype.componentDidMount = function componentDidMount() {
    this.generateSchemes(this.props.color)

    this.clipboardIcon = document.getElementById('scheme-picker-clipboard')

    this.clipboardIcon.addEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.addEventListener('blur', this.hideMsg)
  }

  SchemePicker.prototype.componentDidUpdate = function componentDidUpdate(
    prevProps
  ) {
    var _this2 = this

    // Only invoked when the color input is updated
    /* eslint-disable operator-linebreak */
    if (
      this.props.color !== prevProps.color &&
      /* eslint-disable max-len */
      this.props.color !== this.state.color // This ensures that when we click on a swatch, it will not generate the swatches for the currently selected swatch.
    ) {
      var newColor = new TinyColor(this.props.color)

      if (newColor.isValid) {
        this.setState({ color: newColor.toHexString() }, function() {
          return _this2.generateSchemes(newColor)
        })
      }
    }
  }

  SchemePicker.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clipboardIcon.removeEventListener('mouseleave', this.hideMsg)
    this.clipboardIcon.removeEventListener('blur', this.hideMsg)
  }

  // Generate new color schemes based on the color input and current format state

  // Click handler for a palette

  // default onChange handler for color input field

  SchemePicker.prototype.render = function render() {
    var _state = this.state,
      color = _state.color,
      swatches = _state.swatches,
      showMsg = _state.showMsg

    var _getThemeVariants = getThemeVariants(this.props.theme),
      bg = _getThemeVariants.bg,
      iconColor = _getThemeVariants.iconColor

    return React.createElement(
      Container,
      {
        background: bg,
        width: SCHEME_CONTAINER_WIDTH,
        height: SCHEME_CONTAINER_HEIGHT
      },
      React.createElement(ColorBlock, { color: color }),
      React.createElement(
        'div',
        { style: { padding: 10 } },
        React.createElement(ColorInputField, {
          value: color,
          onChange: this.props.onChange || this.defaultOnChange
        }),
        React.createElement(CompactSwatches, {
          schemes: swatches,
          updateSwatch: this.updateSwatch
        }),
        React.createElement(
          Provider,
          { value: iconColor },
          React.createElement(
            'div',
            {
              className: css(_templateObject$c)
            },
            React.createElement(BasicTools.Clipboard, {
              id: 'scheme-picker-clipboard',
              showMsg: showMsg,
              copyColor: this.copyColor
            })
          )
        )
      )
    )
  }

  return SchemePicker
})(React.Component)

SchemePicker.defaultProps = {
  color: 'hotpink',
  theme: 'light',
  // Default color scheme from which swatches are generated
  scheme: 'monochromatic'
}
SchemePicker.propTypes = {
  color: PropTypes.string,
  /* eslint-disable react/require-default-props */
  onChange: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark']),
  scheme: PropTypes.oneOf([
    'monochromatic',
    'splitcomplement',
    'triad',
    'tetrad',
    'analogous'
  ])
}

export { BasicPicker, GradientPicker, SchemePicker, utils }
