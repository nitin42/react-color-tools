import React from 'react'
import TinyColor from 'tinycolor2'
import { css, injectGlobal } from 'emotion'
import PropTypes from 'prop-types'

import Container from '../components/Container'
import ColorBlock from '../components/ColorBlock'
import Swatches from '../components/Swatches'
import ColorInputField from '../components/ColorInputField'
import ColorFormatPicker from '../components/ColorFormatPicker'
import { BasicTools } from '../components/Tools'

const BigPalette = ({ color, updatePalette }) => (
  <div
    className={css`
      background: ${color};
      width: 50px;
      height: 100px;
      border-radius: 1px;
    `}
    onClick={e => updatePalette(color)}
  />
)

const SmallPalette = ({ color, updatePalette }) => (
  <div
    className={css`
      background: ${color};
      width: 25px;
      height: 25px;
      border-radius: 2px;
    `}
    onClick={e => updatePalette(color)}
  />
)

const Palettes = ({ schemes, small, updatePalette }) => (
  <div
    className={css`
      display: grid;
      grid-template-columns: repeat(40, ${small ? '25px' : '50px'});
      grid-gap: 3px;
      margin-top: 10px;
      overflow: scroll;
      width: 100%;
      height: ${small ? '34px' : '108px'};
    `}
  >
    {schemes
      .reverse()
      .map(
        (scheme, i) =>
          small ? (
            <SmallPalette
              updatePalette={updatePalette}
              color={scheme}
              key={i}
            />
          ) : (
            <BigPalette updatePalette={updatePalette} color={scheme} key={i} />
          )
      )}
  </div>
)

export default class SchemePicker extends React.Component {
  state = {
    color: new TinyColor(this.props.color).toHexString(),
    schemes: [],
    formats: [
      'Monochromatic',
      'Analogous',
      'Split Complement',
      'Triad',
      'Tetrad'
    ],
    currentFormat: 'Monochromatic'
  }

  static defaultProps = {
    monochromaticSchemes: 30,
    analogousSchemes: 30
  }

  static propTypes = {
    monochromaticSchemes: PropTypes.number,
    analogousSchemes: PropTypes.number
  }

  componentDidMount() {
    this.generateSchemes(this.props.color, this.state)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.color !== this.props.color) {
      const color = new TinyColor(this.props.color)
      // Check if its a valid hex and then update the color
      // on changing the color input field, it only updates the color block if the hex code is valid
      if (color.isValid()) {
        this.generateSchemes(color.toHexString())
        this.setState({ color: color.toHexString() })
      }
    }

    if (prevState.currentFormat !== this.state.currentFormat) {
      this.generateSchemes(this.state.color, this.state)
    }
  }

  generateSchemes = (color, newState = this.state) => {
    const newSchemes = new TinyColor(color)
      [
        newState.currentFormat
          .split(' ')
          .join('')
          .toLowerCase()
      ](30)
      .map(c => c.toHexString())
    // TinyColor appends the original color at the end of the array which is something we don't want to render
    newSchemes.splice(newSchemes - 1, 1)

    // All the color schemes should be unique, so we are using a Set!
    const uniqueSchemes = new Set()

    newSchemes.forEach(scheme => uniqueSchemes.add(scheme))

    this.setState(state => ({ schemes: [...uniqueSchemes] }))
  }

  changeFormat = e => this.setState({ currentFormat: e.target.value })

  updatePalette = color => this.setState({ color })

  // default onChange handler for color input field
  defaultOnChange = color => {
    const newColor = new TinyColor(color)

    if (newColor.isValid()) {
      this.setState({ color: newColor.toHexString() })
      this.generateSchemes(newColor.toHexString())
    }
  }

  render() {
    const { schemes, color, swatches, formats } = this.state

    return (
      <Container width="200px">
        <ColorBlock color={color} />
        <div style={{ padding: 10 }}>
          <ColorInputField
            value={color}
            onChange={this.props.onChange || this.defaultOnChange}
          />
          <Palettes
            schemes={schemes}
            small={true}
            updatePalette={this.updatePalette}
          />
          <ColorFormatPicker
            top={5}
            formats={formats}
            changeFormat={this.changeFormat}
          />
          <div
            className={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
            `}
          >
            <BasicTools.Clipboard />
          </div>
        </div>
      </Container>
    )
  }
}
