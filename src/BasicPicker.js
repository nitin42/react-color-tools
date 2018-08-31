import React from 'react'
import { css, injectGlobal } from 'emotion'
import { ColorExtractor } from 'react-color-extractor'
import generateColors from 'randomcolor'

import ColorInput from './components/ColorInputField'
import ColorBlock from './components/ColorBlock'
import ActiveColor from './components/ActiveColor'
import Container from './components/Container'
import Swatches from './components/SwatchesContainer'
import Color from './components/Color'
import ImagePicker from './components/ImagePicker'

injectGlobal`body { background: mistyrose; }`

export class BasicPicker extends React.Component {
	state = {
		color: '#088da5',
		swatches: ['#5a80b4', '#40e0d0', '#088da5', '#f6546a', '#cac8a0', '#0079cf'],
		image: null,
	}

	componentDidMount() {
		const uploadElement = document.getElementById('uploader')
		const imageIcon = document.getElementById('image-icon')

		imageIcon.addEventListener('click', e => {
			if (uploadElement) {
				uploadElement.click()
			}

			e.preventDefault()
		})

		document.addEventListener('keydown', e => {
			if (e.which === 8) {
				this.setState({ image: null })
			}
		})
	}

	generate = e => {
		let i = 0
		let newColors = new Set()

		while (i < 10) {
			newColors.add(generateColors())
			i++
		}

		this.setState({ swatches: [...newColors] })
	}

	uploadFiles = e => {
		this.setState({ image: window.URL.createObjectURL(e.target.files[0]) })
	}

	onChange = color => this.setState({ color })

	renderSwatches = () => {
		const { swatches } = this.state

		return swatches.map((swatch, i) => (
			<span key={i}>
				<Color value={swatch} updateColor={e => this.updateSwatch(swatch)} />
			</span>
		))
	}

	updateSwatch = color => this.setState({ color })

	render() {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
				<Container>
					{this.state.image === null ? (
						<ColorBlock color={this.state.color}>
							<ActiveColor color={this.state.color} />
						</ColorBlock>
					) : (
						<ColorExtractor getColors={colors => this.setState({ swatches: [...colors] })}>
							<img
								src={this.state.image}
								className={css`
									height: 110px;
									border-radius: 6px 6px 0px 0px;
									display: flex;
									align-items: center;
									justify-content: center;
									position: relative;
									width: 100%;
								`}
							/>
						</ColorExtractor>
					)}
					<div style={{ padding: 10 }}>
						<Swatches>
							{this.renderSwatches()}
							<div style={{ clear: 'both' }} />
						</Swatches>
						<ColorInput value={this.state.color} onChange={this.onChange} />
						<div
							className={css`
								margin-top: 10px;
								display: flex;
								justify-content: center;
								cursor: pointer;
							`}
						>
							<span>
								<input
									id="uploader"
									style={{ display: 'none' }}
									type="file"
									accept="image/*"
									onChange={this.uploadFiles}
								/>
								<i id="image-icon" className="fas fa-image" />
							</span>
							<span style={{ marginLeft: 10 }} onClick={this.generate}>
								<i id="image-icon" className="fas fa-palette" />
							</span>
						</div>
					</div>
				</Container>
			</div>
		)
	}
}
