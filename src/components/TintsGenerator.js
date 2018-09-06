import React from 'react'

const TintsGenerator = ({ generateTints, color }) => (
	<span title="tint picker" onClick={generateTints}>
		<i id="image-icon" className="fas fa-tint" style={{ marginLeft: 10, color }} />
	</span>
)

export default TintsGenerator
