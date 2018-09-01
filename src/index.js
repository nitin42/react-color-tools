import React from 'react'
import ReactDOM from 'react-dom'

import { BasicPicker } from './pickers/BasicPicker'

class App extends React.Component {
	state = {
		color: 'blue',
	}

	render() {
		return (
			<BasicPicker
				color={this.state.color}
				onChange={color => this.setState({ color })}
				// onSwatchHover={color => this.setState({ color })}
			/>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
