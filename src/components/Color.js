import React from 'react'
import { css } from 'emotion'

const Color = props => (
	<div
		className={css`
			background: ${props.value};
			height: 22px;
			width: 22px;
			cursor: pointer;
			position: relative;
			outline: none;
			float: left;
			margin-right: 10px;
			margin-bottom: 10px;
			border-radius: 4px;
			&:focus {
				box-shadow: ${props.value} 0px 0px 4px;
			}
		`}
		onClick={props.updateColor}
		tabIndex={0}
	/>
)

// box-shadow: ${props.value} 0px 0px 4px;

export default Color
