import React from 'react'
import { Consumer } from '../utils/context'

const TintsGenerator = ({ generateTints }) => (
	<Consumer>
		{color => (
			<span title="tint picker" onClick={generateTints}>
				<i id="image-icon" className="fas fa-tint" style={{ color }} />
			</span>
		)}
	</Consumer>
)

export default TintsGenerator
