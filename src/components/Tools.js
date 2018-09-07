import React from 'react'
import Slider from './Slider'
import { Consumer } from '../utils/context'

const ColorSaturator = ({ value, onChange }) => (
  <Consumer>
    {color => (
      <React.Fragment>
        <i className="fas fa-star-half-alt icon" style={{ color }} />
        <Slider
          min="10"
          max="100"
          value={value}
          onChange={onChange}
          color={color}
        />
      </React.Fragment>
    )}
  </Consumer>
)

const ColorDesaturator = ({ value, onChange }) => (
  <Consumer>
    {color => (
      <React.Fragment>
        <i className="fas fa-fill icon" style={{ color }} />
        <Slider
          min="10"
          max="100"
          value={value}
          onChange={onChange}
          color={color}
        />
      </React.Fragment>
    )}
  </Consumer>
)

const ColorLightener = ({ value, onChange }) => (
  <Consumer>
    {color => (
      <React.Fragment>
        <i className="far fa-moon icon" style={{ color }} />
        <Slider
          min="10"
          max="100"
          value={value}
          onChange={onChange}
          color={color}
        />
      </React.Fragment>
    )}
  </Consumer>
)

const ColorBrightener = ({ value, onChange }) => (
  <Consumer>
    {color => (
      <React.Fragment>
        <i className="fas fa-sun icon" style={{ color }} />
        <Slider
          min="10"
          max="100"
          value={value}
          onChange={onChange}
          color={color}
        />
      </React.Fragment>
    )}
  </Consumer>
)

const ColorDarkener = ({ color, value, onChange }) => (
  <Consumer>
    {color => (
      <React.Fragment>
        <i className="fas fa-moon icon" style={{ color }} />
        <Slider
          min="10"
          max="100"
          value={value}
          onChange={onChange}
          color={color}
        />
      </React.Fragment>
    )}
  </Consumer>
)

const ColorSpinner = ({ color, onChange, value }) => (
  <Consumer>
    {color => (
      <React.Fragment>
        <i className="fas fa-sync-alt icon" style={{ color }} />
        <Slider
          min="-360"
          max="360"
          value={value}
          onChange={onChange}
          color={color}
        />
      </React.Fragment>
    )}
  </Consumer>
)

const Tools = {
  ColorSaturator,
  ColorDesaturator,
  ColorLightener,
  ColorBrightener,
  ColorDarkener,
  ColorSpinner
}

export default Tools
