import React from 'react'
import styled, { css } from 'react-emotion'

const Select = styled('select')`
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
`

const ColorFormatPicker = ({ changeFormat, renderFormats }) => (
	<div
		className={css`
			display: flex;
			justify-content: center;
			margin-top: 15px;
		`}
	>
		<Select name="formats" onChange={changeFormat}>
			{renderFormats()}
		</Select>
	</div>
)

export default ColorFormatPicker
