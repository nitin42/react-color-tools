import React from 'react'

const Reset = ({ resetColors, color }) => (
	<span title="reset picker" onClick={resetColors} style={{ color }}>
		<i id="image-icon" className="fas fa-arrow-alt-circle-left" style={{ marginLeft: 10 }} />
	</span>
)

export default Reset
