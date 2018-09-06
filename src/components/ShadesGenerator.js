import React from 'react'

const ShadesGenerator = ({ generateShades, color }) => (
	<span title="shade picker" onClick={generateShades}>
		<i id="image-icon" className="fas fa-adjust" style={{ marginLeft: 10, color }} />
	</span>
)

export default ShadesGenerator
