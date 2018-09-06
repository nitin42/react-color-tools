import React from 'react'

const ColorFormats = props => (
	<select style={inputStyles} name="formats" onChange={e => this.setState({ currentFormat: e.target.value })}>
		{this.renderFormats()}
	</select>
)

export default ColorFormats
