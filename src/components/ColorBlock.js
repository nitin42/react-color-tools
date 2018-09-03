import React from 'react'
import { css } from 'emotion'

// Displays a color block with the active color hex code
const ColorBlock = ({ color, children }) => (
	<div
		className={css`
			height: 110px;
			background: ${color.toHexString()};
			border-radius: 6px 6px 0px 0px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
		`}
	>
		{children}
	</div>
)

export default ColorBlock
