import React from 'react'

const PaletteGenerator = ({ generateSwatches, color }) => (
	<span title="Palette generator" style={{ marginLeft: 10 }} onClick={generateSwatches}>
		<i id="image-icon" className="fas fa-palette" style={{ color }} />
	</span>
)

export default PaletteGenerator
