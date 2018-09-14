import React from 'react'
import { css } from 'emotion'

const renderFormats = formats =>
  formats.map((format, key) => {
    return (
      <option value={format} key={key}>
        {format}
      </option>
    )
  })

const ColorFormatPicker = ({ changeFormat, formats }) => (
  <div
    className={css`
      display: flex;
      justify-content: center;
      margin-top: 15px;
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

export default ColorFormatPicker
