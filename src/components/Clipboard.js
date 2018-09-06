import React from 'react'

const Clipboard = ({ copyColor, color }) => (
	<span title="clipboard picker" onClick={copyColor}>
		<i id="image-icon" className="fas fa-clipboard" style={{ marginLeft: 10, color }} />
	</span>
)

export default Clipboard
