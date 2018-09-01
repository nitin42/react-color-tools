import React from 'react'
import { css, injectGlobal } from 'emotion'
import { ColorExtractor } from 'react-color-extractor'
import generateColors from 'randomcolor'
import PropTypes from 'prop-types'
import { TinyColor } from '@ctrl/tinycolor'

import ColorInput from '../components/ColorInputField'
import ColorBlock from '../components/ColorBlock'
import ActiveColor from '../components/ActiveColor'
import Container from '../components/Container'
import Swatches from '../components/Swatches'
import ImagePicker from '../components/ImagePicker'
import PaletteGenerator from '../components/PaletteGenerator'

const DEFAULT_SWATCHES = ['#5a80b4', '#40e0d0', '#088da5', '#f6546a', '#cac8a0', '#0079cf']

const DEFAULT_COLOR = '#088da5'

injectGlobal`body{ background: mistyrose; }`

/**
 * Basic Color Picker - Similar to <BlockPicker /> from react-color but it has image color extractor and palette generator.
 *
 * API
 * 
 * <BasicPicker
 * 	color={DEFAULT_COLOR_IN_COLOR_BLOCK} // Color to show in colorblock pane and input field
 * 	swatches={ARRAY_OF_SWATCHES} // array of swatches to show in the color picker
 * 	onChange={} // Update the color
 * 	onSwatchHover={} // Update the color when hover over the swatches
 * />
 */

export class BasicPicker extends React.Component {
	imageIcon = null
	uploadElement = null

	state = {
		color: new TinyColor(this.props.color),
		swatches: this.props.swatches,
		image: null,
	}

	static defaultProps = {
		color: DEFAULT_COLOR,
		swatches: DEFAULT_SWATCHES,
	}

	componentDidMount() {
		this.uploadElement = document.getElementById('uploader')
		this.imageIcon = document.getElementById('image-icon')

		this.imageIcon.addEventListener('click', this.simulateClick)
		document.addEventListener('keydown', this.updateKey)
	}

	componentWillUnmount() {
		this.imageIcon.removeEventListener('click', this.simulateClick)
		document.removeEventListener('keydown', this.updateKey)
	}

	updateKey = e => {
		if (e.which === 8) {
			this.setState({ image: null })
		}
	}

	simulateClick = e => {
		if (this.uploadElement) {
			this.uploadElement.click()
		}

		e.preventDefault()
	}

	generateSwatches = e => {
		let i = 0
		// Each swatch should be different
		const newColors = new Set()

		while (i < 10) {
			newColors.add(generateColors())
			i++
		}

		this.setState({ swatches: [...newColors] })
	}

	uploadImage = e => {
		this.setState({ image: window.URL.createObjectURL(e.target.files[0]) })
	}

	onChange = color => {
		const hex = new TinyColor(color)

		if (hex.isValid) {
			this.setState({ color: new TinyColor(color) })
		}
	}

	updateSwatch = color => this.setState({ color: new TinyColor(color) })

	updateSwatches = swatches => this.setState({ swatches: [...swatches], color: new TinyColor(swatches[0]) })

	render() {
		const { image, color, swatches } = this.state
		return (
			<Container>
				<ColorBlock color={color}>
					<ActiveColor color={color} />
				</ColorBlock>
				{image && <ColorExtractor maxColors={this.props.maxColors} src={image} getColors={this.updateSwatches} />}
				<div style={{ padding: 10 }}>
					<Swatches swatches={swatches} updateSwatch={this.updateSwatch} onSwatchHover={this.updateSwatch} />
					<ColorInput value={color.toHexString()} onChange={this.onChange} />
					<div
						className={css`
							margin-top: 10px;
							display: flex;
							justify-content: center;
							cursor: pointer;
						`}
					>
						<ImagePicker uploadImage={this.uploadImage} />
						<PaletteGenerator generateSwatches={this.generateSwatches} />
					</div>
				</div>
			</Container>
		)
	}
}
