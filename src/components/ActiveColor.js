import React from 'react'
import { css } from 'emotion'

const ActiveColor = props => (
	<div
		className={css`
			font-size: 18px;
			color: ${props.color === 'white' || props.color === '#ffff' ? 'black' : '#ffff'};
			position: relative;
		`}
	>
		{props.color}
	</div>
)

export default ActiveColor
