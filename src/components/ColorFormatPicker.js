import React from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'

const renderFormats = formats =>
  formats.map(format => (
    <option value={format} key={format}>
      {format}
    </option>
  ))

const ColorFormatPicker = ({ changeFormat, formats, top }) => (
  <div
    className={css`
      display: flex;
      justify-content: center;
      margin-top: ${top || '15px'};
    `}
  >
    <select
      className={css`
        border: 0px solid rgb(102, 102, 102);
        box-sizing: border-box;
        padding: 0px 7px;
        border-radius: 4px;
        color: rgb(102, 102, 102);
        height: 18px;
        box-shadow: rgb(221, 221, 221) 0px 0px 0px 1px inset;
        outline: none;
        font-size: 12px;
        color: rgb(102, 102, 102);
      `}
      name="formats"
      onChange={changeFormat}
    >
      {renderFormats(formats)}
    </select>
  </div>
)

ColorFormatPicker.propTypes = {
  formats: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeFormat: PropTypes.func.isRequired
}

export default ColorFormatPicker
