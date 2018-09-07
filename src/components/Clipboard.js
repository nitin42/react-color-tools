import React from 'react'

const Clipboard = ({ copyColor, color }) => (
	<span title="clipboard picker" onClick={copyColor}>
		<i id="image-icon" className="fas fa-copy" style={{ color }} />
	</span>
)

export default Clipboard
