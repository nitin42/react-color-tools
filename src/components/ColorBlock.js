import React from 'react'
import { css } from 'emotion'

const ColorBlock = props => (
	<div
		className={css`
			height: 110px;
			background: ${props.color};
			border-radius: 6px 6px 0px 0px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
		`}
	>
		{props.children}
	</div>
)

export default ColorBlock
