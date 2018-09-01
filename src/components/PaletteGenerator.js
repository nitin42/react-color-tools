import React from 'react'

const PaletteGenerator = ({ generateSwatches }) => (
	<span title="Palette generator" style={{ marginLeft: 10 }} onClick={generateSwatches}>
		<i id="image-icon" className="fas fa-palette" />
	</span>
)

export default PaletteGenerator
