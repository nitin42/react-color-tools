import React from 'react'
import { css, injectGlobal } from 'emotion'
import { ColorExtractor } from 'react-color-extractor'
import generateColors from 'randomcolor'
import { TinyColor } from '@ctrl/tinycolor'
import Values from 'values.js'

import ColorInput from '../components/ColorInputField'
import ColorBlock from '../components/ColorBlock'
import ActiveColor from '../components/ActiveColor'
import Container from '../components/Container'
import Swatches from '../components/Swatches'
import ImagePicker from '../components/ImagePicker'
import PaletteGenerator from '../components/PaletteGenerator'
import Triangle from '../components/Triangle'
import ColorFormatPicker from '../components/ColorFormatPicker'
import TintsGenerator from '../components/TintsGenerator'
import ShadesGenerator from '../components/ShadesGenerator'
import Clipboard from '../components/Clipboard'
import Reset from '../components/Reset'

const DEFAULT_SWATCHES = [
	'#5a80b4',
	'#40e0d0',
	'#088da5',
	'#f6546a',
	'#cac8a0',
	'#0079cf',
	'#ffa6ca',
	'#03ec13',
	'#3999dc',
	'#e1c9ec',
]
const DEFAULT_COLOR = '#088da5'
const MAX_COLORS = 64

/**
 * API usage -
 *
 * <BasicPicker
 * 		color={DEFAULT_COLOR_IN_COLOR_BLOCK_AND_INPUT_FIELD} // Color to show in colorblock pane and input field
 * 		swatches={ARRAY_OF_SWATCHES} // array of swatches to show in the color picker
 * 		onChange={} // Invoked when the color is updated
 * 		onSwatchHover={} // Invoked on hover over the swatches
 * 		maxColors={} // use this prop to control amount of palette generated from the swatches the when an image is uploaded
 * 		theme="dark_or_light"
 * />
 */

export class BasicPicker extends React.Component {
	// Image upload icon
	imageIcon = null
	// Hidden input element for uploading an image
	uploadElement = null

	state = {
		// Current block, active and input field color (or hue)
		color: new TinyColor(this.props.color),
		// Current swatches to be displayed in picker
		swatches: this.props.swatches,
		// Image from which colors are extracted
		image: null,
		// Shades are the hue darkened with black
		shades: [],
		// Tints are the hue lightend with white
		tints: [],
		// Should display the shades swatches
		showShades: false,
		// Should display the tint swatches
		showTints: false,
		// Current color format selected
		currentFormat: 'HEX',
		// Color format options
		formats: ['HSL', 'HSV', 'RGB', 'HEX'],
	}

	static defaultProps = {
		color: DEFAULT_COLOR,
		swatches: DEFAULT_SWATCHES,
		maxColors: MAX_COLORS,
		triangle: true,
		width: '170px',
		theme: 'light',
	}

	componentDidMount() {
		this.uploadElement = document.getElementById('uploader')
		this.imageIcon = document.getElementById('image-icon')

		this.imageIcon.addEventListener('click', this.simulateClick)

		// Attach a listener for deleting the image (if any) from the color block
		document.addEventListener('keydown', this.updateKey)
	}

	componentDidUpdate(oldProps, oldState) {
		// This is invoked only when we are working with actual API of this component

		if (oldProps.color !== this.props.color) {
			const color = new TinyColor(this.props.color)

			// Check if its a valid hex and then update the color
			// on changing the color input field, it only updates the color block if the hex code is valid
			if (color.isValid) {
				this.setState({ color })
			}
		}

		// if (oldProps.swatches !== this.props.swatches) {
		// 	this.setState({ swatches: this.props.swatches })
		// }
	}

	componentWillUnmount() {
		this.imageIcon.removeEventListener('click', this.simulateClick)
		document.removeEventListener('keydown', this.updateKey)
	}

	// outputs the color according to the color format
	getFormat = color => ({
		HSL: color.toHslString(),
		HEX: color.toHexString(),
		RGB: color.toRgbString(),
		HSV: color.toHsvString(),
	})

	renderFormats = () =>
		this.state.formats.map((format, key) => {
			return (
				<option value={format} key={key}>
					{format}
				</option>
			)
		})

	updateKey = e => {
		if (e.which === 8) {
			this.setState({ image: null, showShades: false, showTints: false })
		}
	}

	simulateClick = e => {
		if (this.uploadElement) {
			this.uploadElement.click()
		}

		e.preventDefault()
	}

	// Randomly generate new swatches
	generateSwatches = e => {
		let i = 0

		// Each swatch should be different
		const newColors = new Set()

		while (i < 10) {
			newColors.add(generateColors())
			i++
		}

		// Remove shades and tints when new swatches are added
		this.setState({ swatches: [...newColors], showShades: false, showTints: false })
	}

	uploadImage = e => this.setState({ image: window.URL.createObjectURL(e.target.files[0]) })

	updateSwatch = color => {
		this.setState({ color: new TinyColor(color) })

		this.props.onChange && this.props.onChange(color)
	}

	// disable shades and tints when colors are extracted from an image
	updateSwatches = swatches =>
		this.setState({ swatches: [...swatches], color: new TinyColor(swatches[0]), showShades: false, showTints: false })

	generateSwatchesFromHue = (term, showShades, showTints) => {
		const colorBuffer = []
		const color = new Values(this.state.color.toHexString())

		color[term]().forEach(c => colorBuffer.push(c.hexString()))

		this.setState({ [term]: [...colorBuffer], showShades: showShades, showTints: showTints })
	}

	generateShades = e => this.generateSwatchesFromHue('shades', true, false)

	generateTints = e => this.generateSwatchesFromHue('tints', false, true)

	changeFormat = e => this.setState({ currentFormat: e.target.value })

	resetColors = e =>
		this.setState({
			color: new TinyColor(this.props.color),
			swatches: this.props.swatches,
			image: null,
			shades: [],
			tints: [],
			showShades: false,
			showTints: false,
		})

	render() {
		const { image, swatches, shades, showShades, showTints, tints, currentFormat } = this.state

		const color = this.getFormat(this.state.color)[currentFormat]

		const bg = this.props.theme === 'dark' ? '#1f1f1f' : 'rgb(255, 255, 255)'
		const iconColor = this.props.theme === 'dark' ? 'rgb(255, 255, 255)' : '#000A14'

		return (
			<Container background={bg} width={this.props.width}>
				{this.props.triangle && this.state.image === null && <Triangle color={this.state.color.toHexString()} />}
				{this.state.image === null ? (
					<ColorBlock color={this.state.color}>
						<ActiveColor color={color} />
					</ColorBlock>
				) : (
					<img src={this.state.image} alt="image" style={{ width: this.props.width }} />
				)}
				{image && <ColorExtractor maxColors={this.props.maxColors} src={image} getColors={this.updateSwatches} />}
				<div style={{ padding: 10 }}>
					{showShades ? (
						<Swatches swatches={shades} updateSwatch={this.updateSwatch} onSwatchHover={this.props.onSwatchHover} />
					) : showTints ? (
						<Swatches swatches={tints} updateSwatch={this.updateSwatch} onSwatchHover={this.props.onSwatchHover} />
					) : (
						<Swatches swatches={swatches} updateSwatch={this.updateSwatch} onSwatchHover={this.props.onSwatchHover} />
					)}
					<ColorInput value={color} onChange={this.props.onChange} />
					<ColorFormatPicker changeFormat={this.changeFormat} renderFormats={this.renderFormats} />
					<div
						className={css`
							display: flex;
							justify-content: center;
							margin-top: 10px;
							cursor: pointer;
						`}
					>
						<ImagePicker uploadImage={this.uploadImage} color={iconColor} />
						<PaletteGenerator generateSwatches={this.generateSwatches} color={iconColor} />
						<TintsGenerator generateTints={this.generateTints} color={iconColor} />
						<ShadesGenerator generateShades={this.generateShades} color={iconColor} />
						<Clipboard
							copyColor={e => {
								navigator.clipboard.writeText(color)
							}}
							color={iconColor}
						/>
						<Reset resetColors={this.resetColors} color={iconColor} />
					</div>
				</div>
			</Container>
		)
	}
}
