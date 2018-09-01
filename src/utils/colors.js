import { TinyColor } from '@ctrl/tinycolor'

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
		source: data.source,
	}
}

// Copied from react-color/helpers/colors

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
