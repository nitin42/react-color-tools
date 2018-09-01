import React from 'react'
import { css } from 'emotion'

import Swatch from './Swatch'

const Swatches = ({ swatches, updateSwatch, onSwatchHover }) => (
	<div style={{ marginRight: -10 }}>
		{swatches.map((color, key) => (
			<span key={key}>
				<Swatch
					value={color}
					updateSwatch={e => updateSwatch(color, e)}
					updateSwatchOnEnter={e => (e.keyCode === 13 ? updateSwatch(color, e) : null)}
					onSwatchHover={e => onSwatchHover(color, e)}
				/>
			</span>
		))}
		<div style={{ clear: 'both' }} />
	</div>
)

Swatches.defaultProps = {
	onSwatchHover: (color, e) => {},
}

export default Swatches
