import React from 'react'
import { css } from 'emotion'

const CONTAINER_BACKGROUND = 'rgb(255, 255, 255)'

// Main color picker container
const Container = ({ children, width }) => (
	<div
		className={css`
			width: ${width};
			background: ${CONTAINER_BACKGROUND};
			box-shadow: rgba(0, 0, 0, 0.1) 0px 1px;
			border-radius: 6px;
			position: relative;
		`}
	>
		{children}
	</div>
)

export default Container
