import React from 'react'
import { css } from 'emotion'

import { getContrastingColor } from '../utils/colors'

const ActiveColor = ({ color }) => (
	<div
		className={css`
			font-size: 18px;
			color: ${getContrastingColor(color.toHex())};
			position: relative;
		`}
	>
		{color.toHexString()}
	</div>
)

export default ActiveColor
