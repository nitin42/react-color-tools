import React from 'react'
import { css } from 'emotion'

const Swatch = ({ value, updateSwatch, onSwatchHover, updateSwatchOnEnter }) => (
	<div
		className={css`
			background: ${value};
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
				box-shadow: ${value} 0px 0px 4px;
			}
		`}
		title={value}
		onClick={updateSwatch}
		onKeyDown={updateSwatchOnEnter}
		onMouseOver={onSwatchHover}
		tabIndex={0}
	/>
)

export default Swatch
