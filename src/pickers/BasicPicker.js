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

const DEFAULT_SWATCHES = ['#5a80b4', '#40e0d0', '#088da5', '#f6546a', '#cac8a0', '#0079cf']

const DEFAULT_COLOR = '#088da5'

const MAX_COLORS = 64

injectGlobal`body{ background: mistyrose; padding: 50px; }`

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
		onSwatchHover: (color, e) => {},
		onChange: color => {},
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
			if (color.isValid) {
				this.setState({ color })
			}
		}

		if (oldProps.swatches !== this.props.swatches) {
			this.setState({ swatches })
		}
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

		// Remove shades and tints when new swatches are generated
		this.setState({ swatches: [...newColors], showShades: false, showTints: false })
	}

	uploadImage = e => this.setState({ image: window.URL.createObjectURL(e.target.files[0]) })

	updateSwatch = color => {
		this.setState({ color: new TinyColor(color) })

		this.props.onChange && this.props.onChange(color)

		this.props.onSwatchHover && this.props.onSwatchHover(color)
	}

	updateColorInput = color => {
		const newColor = new TinyColor(color)

		if (newColor.isValid) {
			this.setState({ color: newColor })
		}

		this.props.onChange && this.props.onChange(color)
	}

	// disable shades and tints when colors are extracted from an image
	updateSwatches = swatches =>
		this.setState({ swatches: [...swatches], color: new TinyColor(swatches[0]), showShades: false, showTints: false })

	generateShades = e => {
		const shades = []
		const color = new Values(this.state.color.toHexString())

		color.shades().forEach(shade => shades.push(shade.hexString()))

		// Disable tints
		this.setState({ shades: [...shades], showShades: true, showTints: false })
	}

	generateTints = e => {
		const tints = []
		const color = new Values(this.state.color.toHexString())

		color.tints().forEach(tint => tints.push(tint.hexString()))

		// Disable shades
		this.setState({ tints: [...tints], showShades: false, showTints: true })
	}

	render() {
		const { image, swatches, shades, showShades, showTints, tints, currentFormat } = this.state
		const color = this.getFormat(this.state.color)[currentFormat]

		const bg = this.props.theme === 'dark' ? '#1f1f1f' : 'rgb(255, 255, 255)'
		const iconColor = this.props.theme === 'dark' ? 'rgb(255, 255, 255)' : '#000A14'

		return (
			<Container background={bg} width={this.props.width}>
				{this.props.triangle &&
					this.state.image === null && (
						<div
							className={css`
								width: 0px;
								height: 0px;
								border-style: solid;
								border-width: 0 10px 10px 10px;
								border-color: transparent transparent ${this.state.color.toHexString()} transparent;
								position: absolute;
								top: -10px;
								left: 50%;
								margin-left: -10px;
							`}
						/>
					)}
				{this.state.image === null ? (
					<ColorBlock color={this.state.color}>
						<ActiveColor color={color} />
					</ColorBlock>
				) : (
					<img src={this.state.image} style={{ width: this.props.width }} />
				)}
				{image && <ColorExtractor maxColors={this.props.maxColors} src={image} getColors={this.updateSwatches} />}
				<div style={{ padding: 10 }}>
					{showShades ? (
						<Swatches swatches={shades} updateSwatch={this.updateSwatch} onSwatchHover={this.updateSwatch} />
					) : showTints ? (
						<Swatches swatches={tints} updateSwatch={this.updateSwatch} onSwatchHover={this.updateSwatch} />
					) : (
						<Swatches swatches={swatches} updateSwatch={this.updateSwatch} onSwatchHover={this.updateSwatch} />
					)}
					<ColorInput value={color} onChange={this.updateColorInput} />
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
						<select
							className={css`
								border: 0px solid rgb(102, 102, 102);
								box-sizing: border-box;
								padding: 0px 7px;
								border-radius: 4px;
								color: rgb(102, 102, 102);
								height: 16px;
								box-shadow: rgb(221, 221, 221) 0px 0px 0px 1px inset;
								outline: none;
								font-size: 10px;
								color: rgb(102, 102, 102);
							`}
							name="formats"
							onChange={e => this.setState({ currentFormat: e.target.value })}
						>
							{this.renderFormats()}
						</select>
					</div>
					<div
						className={css`
							margin-top: 10px;
							display: flex;
							justify-content: center;
							cursor: pointer;
						`}
					>
						<ImagePicker uploadImage={this.uploadImage} color={iconColor} />
						<PaletteGenerator generateSwatches={this.generateSwatches} color={iconColor} />
						<span title="tint picker" onClick={this.generateTints}>
							<i id="image-icon" className="fas fa-tint" style={{ marginLeft: 10, color: iconColor }} />
						</span>
						<span title="shade picker" onClick={this.generateShades}>
							<i id="image-icon" className="fas fa-adjust" style={{ marginLeft: 10, color: iconColor }} />
						</span>
						<span
							title="clipboard picker"
							onClick={e => {
								navigator.clipboard.writeText(color)
							}}
						>
							<i id="image-icon" className="fas fa-clipboard" style={{ marginLeft: 10, color: iconColor }} />
						</span>
						<span
							title="reset picker"
							onClick={e =>
								this.setState({
									color: new TinyColor(this.props.color),
									swatches: this.props.swatches,
									image: null,
									shades: [],
									tints: [],
									showShades: false,
									showTints: false,
								})
							}
							style={{ color: iconColor }}
						>
							<i id="image-icon" className="fas fa-arrow-alt-circle-left" style={{ marginLeft: 10 }} />
						</span>
					</div>
				</div>
			</Container>
		)
	}
}
