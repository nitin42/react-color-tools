import React from 'react'

import { css } from 'emotion'

const INPUT_COLOR_SCHEME = 'rgb(102, 102, 102)'

// Copied and edited from react-color/EditableInput
export default class ColorInputField extends React.Component {
  state = {
    value: String(this.props.value).toUpperCase(),
    blurValue: String(this.props.value).toUpperCase()
  }

  componentWillReceiveProps(nextProps) {
    const input = this.input

    if (nextProps.value !== this.state.value) {
      if (input === document.activeElement) {
        this.setState({ blurValue: String(nextProps.value).toUpperCase() })
      } else {
        this.setState({
          value: String(nextProps.value).toUpperCase(),
          blurValue:
            !this.state.blurValue && String(nextProps.value).toUpperCase()
        })
      }
    }
  }

  handleBlur = () => {
    if (this.state.blurValue) {
      this.setState({ value: this.state.blurValue, blurValue: null })
    }
  }

  handleChange = e => {
    this.props.onChange && this.props.onChange(e.target.value, e)

    this.setState({ value: e.target.value })
  }

  handleKeyDown = e => {
    const stringValue = String(e.target.value)
    const isPercentage = stringValue.indexOf('%') > -1
    const number = Number(stringValue.replace(/%/g, ''))

    if (!isNaN(number)) {
      const amount = this.props.arrowOffset || 1

      if (e.keyCode === 38) {
        this.props.onChange && this.props.onChange(number + amount, e)

        if (isPercentage) {
          this.setState({ value: `${number + amount}%` })
        } else {
          this.setState({ value: number + amount })
        }
      }

      // Down
      if (e.keyCode === 40) {
        this.props.onChange && this.props.onChange(number - amount, e)

        if (isPercentage) {
          this.setState({ value: `${number - amount}%` })
        } else {
          this.setState({ value: number - amount })
        }
      }
    }
  }

  render() {
    return (
      <input
        className={css`
          border: 0px solid ${INPUT_COLOR_SCHEME};
          box-sizing: border-box;
          padding: 0px 7px;
          border-radius: 4px;
          color: ${INPUT_COLOR_SCHEME};
          height: 22px;
          width: 100%;
          box-shadow: rgb(221, 221, 221) 0px 0px 0px 1px inset;
          outline: none;
          font-size: 12px;
        `}
        ref={input => (this.input = input)}
        value={this.state.value}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        placeholder={this.props.placeholder}
        spellCheck="false"
      />
    )
  }
}
