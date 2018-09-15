import React from 'react'
import renderer from 'react-test-renderer'
import { TinyColor } from '@ctrl/tinycolor'

import ColorBlock from '../../src/components/ColorBlock'
import Swatches from '../../src/components/Swatches'
import { AdvanceTools, BasicTools } from '../../src/components/Tools'

import { Provider } from '../../src/utils/context'

const noop = () => {}

it('should render the color block with a color code and children', () => {
  const App = () => (
    <ColorBlock colorState={new TinyColor('#f00')} color={'#f00'} />
  )

  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render the color block with hex color when the current format is HSV', () => {
  const App = () => (
    <ColorBlock
      colorState={new TinyColor('#f00')}
      currentFormat={'HSV'}
      color={'#f00'}
    />
  )

  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render a list of swatches', () => {
  const App = () => (
    <Swatches
      swatches={['red', 'blue', 'purple', 'green', 'brown']}
      updateSwatch={noop}
      onSwatchHover={noop}
    />
  )

  const tree = renderer.create(<App />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render basic color tools', () => {
  const color = '#f00'

  const BTools = () => (
    <Provider value={color}>
      <BasicTools.TintsGenerator generateTints={noop} />
      <BasicTools.ShadesGenerator generateShades={noop} />
      <BasicTools.PaletteGenerator generateSwatches={noop} />
      <BasicTools.ImagePicker uploadImage={noop} />
      <BasicTools.Reset resetColors={noop} />
      <BasicTools.Clipboard copyColor={noop} />
    </Provider>
  )

  const tree = renderer.create(<BTools />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render advanced color tools', () => {
  const color = '#eeee'

  const ATools = () => (
    <Provider value={color}>
      <AdvanceTools.ColorBrightener value={0} onChange={noop} />
      <AdvanceTools.ColorDarkener value={20} onChange={noop} />
      <AdvanceTools.ColorDesaturator value={50} onChange={noop} />
      <AdvanceTools.ColorLightener value={10} onChange={noop} />
      <AdvanceTools.ColorSaturator value={20} onChange={noop} />
      <AdvanceTools.ColorSpinner value={-120} onChange={noop} />
    </Provider>
  )

  const tree = renderer.create(<ATools />).toJSON()

  expect(tree).toMatchSnapshot()
})
