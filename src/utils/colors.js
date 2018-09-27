import { TinyColor } from '@ctrl/tinycolor'
import generateColors from 'randomcolor'

// Copied from react-color/helpers/colors

function toState(data, oldHue) {
  const color = data.hex ? new TinyColor(data.hex) : new TinyColor(data)
  const hsl = color.toHsl()
  const hsv = color.toHsv()
  const rgb = color.toRgb()
  const hex = color.toHex()
  if (hsl.s === 0) {
    hsl.h = oldHue || 0
    hsv.h = oldHue || 0
  }
  const transparent = hex === '000000' && rgb.a === 0

  return {
    hsl,
    hex: transparent ? 'transparent' : `#${hex}`,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source
  }
}

// Copied from react-color/helpers/colors

/* eslint-disable import/prefer-default-export */
export function getContrastingColor(data) {
  if (!data) {
    return '#fff'
  }
  const col = toState(data)
  if (col.hex === 'transparent') {
    return 'rgba(0,0,0,0.4)'
  }
  const yiq = (col.rgb.r * 299 + col.rgb.g * 587 + col.rgb.b * 114) / 1000
  return yiq >= 128 ? '#000' : '#fff'
}

// Returns a set of random colors (this is used in generating different gradients)
export const randomColors = () => {
  let i = 0
  const newColors = new Set()

  while (i < 3) {
    newColors.add(generateColors())
    i += 1
  }

  return newColors
}

// Color conversion helpers
export const utils = {
  toRGB: color => new TinyColor(color).toRgbString(),
  toHSL: color => new TinyColor(color).toHslString(),
  toHSV: color => new TinyColor(color).toHsvString(),
  toRGBPercent: color => new TinyColor(color).toPercentageRgbString()
}
