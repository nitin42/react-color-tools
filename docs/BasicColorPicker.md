# Basic Color Picker

<p align="center">
    <img src="../media/basic_picker.gif" />
</p>

## `<BasicColorPicker />`

Basic color picker includes tools such as -

- Image color extraction

- Generating shades and tints
- Built-in color manipulation tools

- and color conversion APIs

## Usage

```jsx
import React from 'react'
import { BasicColorPicker } from 'react-color-tools'

class App extends React.Component {
  state = {
    color: 'hotpink'
  }

  render() {
    const { color } = this.state

    return (
      <div>
        <BasicColorPicker
          color={color}
          onChange={color => this.setState({ color })}
        />
        <h1 style={{ color }}>React Color Tools</h1>
      </div>
    )
  }
}
```

##Component API

`color: string`

color prop represents what color is currently active in the color picker. Use this prop to initialize the color picker with a particular color, or to keep it in sync with the state of a parent component.

```jsx
<BasicColorPicker color={this.state.color} />
```

`onChange: (color) => {}`

This is invoked everytime when a color is updated in the color picker for example - clicking a swatch, extracting colors from image, generating swatches, shades or tints. Use this callback to update the state of parent component with the currently active color.

```jsx
<div>
  <BasicColorPicker
    color={this.state.color}
    onChange={color => this.setState({ color })}
  />
  <h1 style={{ color: this.state.color }}>Color Tools</h1>
</div>
```

`swatches: Array<string>`

Initialize your own swatches in the color picker by passing an array of colors in either hex format or name of the color.

```jsx
<BasicColorPicker swatches={['red', 'mistyrose', 'hotpink']} />
```

`onSwatchHover: (color) => {}`

Similar to `onChange` callback. The only difference is, this is invoked on hovering over a color in the color picker.

`theme: string`

`theme` prop accepts two values - `light` and `dark`. Use this prop to set the theme of the color picker

`maxColors: number`

`maxColors` prop accepts a number for amount of colors in palette from which swatches will be generated from an image

`showTools: boolean`

When set to true, will add advance color manipulation tools to the color picker. This includes -

- **Color spin** - spin (change) the color by a degree amount

<p>
    <img src="../media/spin.gif" />
</p>

- **Color desaturation** - making the color more muted or closer to gray

<p>
  <img src="../media/desaturation.gif" />
</p>

- **Color saturation** - changing the intensity or purity of color

<p>
    <img src="../media/saturation.gif" />
</p>

- **Color darkening** - darken a color by an amount

<p>
    <img src="../media/darken.gif" />
</p>

- **Color brighten** - brighten a color by an amount

<p>
    <img src="../media/lighten.gif" />
</p>

<p>
    
</p>
