# Basic Color Picker

<p align="center">
    <img src="../media/basic_picker.gif" />
</p>

## `<BasicColorPicker />`

Basic color picker provides tools such as -

- Image color extraction

- Generating shades and tints
- Built-in color manipulation tools

- and color conversion APIs

## Usage

```jsx
import React from 'react'
import { render } from 'react-dom'
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

color prop represents what color is currently active on the color picker. Use this prop to initialise the color picker with a particular color, or to keep it in sync with the state of a parent component.

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
