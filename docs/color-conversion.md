## Color conversion APIs

By default, the color format in color picker is hex. To convert a color from one format to another, use the `utils` object which is available as named export.

```js
import { utils } from 'react-color-tools'
```

For example - The default format for color when `onChange` is invoked is hex.

```jsx
state = { color: 'red' }

<BasicPicker color={this.state.color} onChange={color => {
  this.setState({ color });
  console.log(color); // #F00
}}/>
```

---

**`toRGB(color)`**

To convert a color to rgb format, use the method `toRGB(color)`

```
utils.toRGB(color)
```

Example -

```jsx
import React from 'react'
import { BasicPicker, utils } from 'react-color-tools'

class App extends React.Component {
  state = {
    color: 'hotpink'
  }

  render() {
    return (
      <div>
        <BasicPicker
          color={this.state.color}
          onChange={color => this.setState({ color: utils.toRGB(color) })}
        />
        <h1 style={{ color: this.state.color }}>React Color Tools</h1>
      </div>
    )
  }
}
```

Similarly for other formats,

**`toHSL`**

```
utils.toHSL(color)
```

**`toHSV`**

```
utils.toHSV(color)
```

**`toRGBPercent`**

```
utils.toRGBPercent(color)
```

###
