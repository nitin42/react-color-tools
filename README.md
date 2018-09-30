# react-color-tools

[![Build Status](https://travis-ci.org/nitin42/react-color-tools.svg?branch=master)](https://travis-ci.org/nitin42/react-color-tools)

> A set of tools as React components for working with colors

<p align="center">
  <img src="./media/demo.gif" />
</p>

## Table of contents

- [Introduction](#introduction)

- [Motivation](#motivation)

- [Features](#features)

- [Use cases](#use-cases)

- [Theory](#theory)

- [Install](#install)

- [Usage](#usage)

- [Examples](#examples)

- [Documentation](#documentation)

- [Contributing](#contributing)

- [License](#license)

## Introduction

`react-color-tools` provides a set of tools as React components for working with colors. These tools can be used to manipulate a color for example controlling the intensity or purity of color, extracting swatches from an image, creating a gradienty defining color stop positions, choosing from variety of shades and tints or choosing a color scheme.

## Motivation

`react-color-tools` is inspired from [`react-color`](https://github.com/casesandberg/react-color). I was using `react-color` for my projects and felt the need for more features like [image color extraction](https://react-color-extractor.surge.sh), generating shades and tints, creating gradients, and advance color tools for controlling the intensity and value of the color. So I decided to build `react-color-tools` with these features while keeping the API surface minimal and easy to use.

## Features

- Image color extraction

- Generate shades and tints

- Built-in color manipulation tools

- Create gradient by controlling the color stop positions

- API for color conversions

- Color scheme picker

## Use cases

- Managing color schemes

- Design systems & creating design tools

## Theory

A little bit about different color terms and color harmonies that you will be using while working with `react-color-tools`.

<p align="center">
  <img src="https://www.canva.com/learn/wp-content/uploads/2015/07/color-theory-1-tb-752x0.png" />
</p>

> Image taken from Canva

### Color terms

- **Hue** - A hue is name of particular color, or it is also one of the 12 colors on the color wheel.

- **Shade** - A shade is a hue darkened with black.

- **Tint** - A tint is a hue lightened with gray.

- **Saturation** - Describes the intensity or purity of color.

- **Desaturation** - Desaturation makes a color look more muted (hue approaches closer to gray).

### Color schemes

- **Monochromatic** - This color scheme contains tints, shades and tones of a color.

- **Analogous** - This color scheme contains the hues that are located side by side on the color wheel.

- **Split Complementary** - This scheme represent any color on the color wheel plus two colors that are it's complement.

- **Triadic** - This color scheme has three colors that are evenly spaced on the color wheel.

- **Tetradic** - Two pairs of colors which are opposite on the color wheel

## Install

```
npm install react-color-tools
```

or if you use yarn,

```
yarn add react-color-tools
```

**This package also depends on React so make sure you've it installed.**

## Usage

```js
import React from 'react'
import { render } from 'react-dom'
import { BasicPicker } from 'react-color-tools'

class App extends React.Component {
  state = {
    color: 'hotpink'
  }

  render() {
    return (
      <div>
        <BasicPicker
          color={this.state.color}
          onChange={color => this.setState({ color })}
        />
        <h1 style={{ color: this.state.color }}>React Color Tools</h1>
      </div>
    )
  }
}
```

This will render -

<p align="center">
  <img src="./media/basic_picker.gif" />
</p>

## Examples

#### Basic Picker

[![Edit jj7jpl5xvv](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jj7jpl5xvv)

#### Gradient Picker

[![Edit wqln38j8wk](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/wqln38j8wk)

#### Scheme Picker

[![Edit 935ppx461o](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/935ppx461o)

or checkout the [`examples`](./examples) folder

## Documentation

[Check out the detailed documentation](./docs)

## TODO

- [ ] Use a monorepo format to store different pickers and color tools

- [ ] Tweak rollup config to reduce bundle size

- [ ] Remove [tooltip styles](./src/styles) and use `react-emotion` to create tooltip component

- [ ] Add bezier easing to gradient picker component

## Contributing

If you'd like to contribute to this project, then follow the below instructions to setup the project locally on your machine.

```
git clone https://github.com/<your_username_here>/react-color-tools

cd react-color-tools

yarn
```

### Linting

Run eslint using `yarn lint`

### Building the source code

Run `yarn build` to build the source code. To use the watch mode, run the cmd `yarn build:watch`

### Formatting with Prettier

Run `yarn formatall` to format the source code.

### Storybook

Run `yarn storybook` to start the storybook development environment.

### Test

Run `yarn test` to test the pickers.

## License

MIT
