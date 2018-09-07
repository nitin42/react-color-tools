import React from 'react'

const Reset = ({ resetColors, color }) => (
	<span title="reset picker" onClick={resetColors}>
		<i id="image-icon" className="fas fa-arrow-alt-circle-left" style={{ color }} />
	</span>
)

export default Reset
