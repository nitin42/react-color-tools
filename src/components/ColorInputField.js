import React from 'react'
import ReactDOM from 'react-dom'

import { EditableInput } from 'react-color/lib/components/common'

const inputStyles = {
	input: {
		border: '0px solid rgb(102, 102, 102)',
		boxSizing: 'border-box',
		padding: '0px 7px',
		borderRadius: '4px',
		color: 'rgb(102, 102, 102)',
		height: '22px',
		width: '100%',
		boxShadow: 'rgb(221, 221, 221) 0px 0px 0px 1px inset',
		outline: 'none',
	},
	label: {
		fontSize: '12px',
		color: 'rgb(102, 102, 102)',
	},
}

const ColorInputField = ({ label, onChange, value }) => (
	<EditableInput style={inputStyles} label={label} value={value} onChange={onChange} />
)

export default ColorInputField
