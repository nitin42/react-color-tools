import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import filesize from 'rollup-plugin-filesize'
import postcss from 'rollup-plugin-postcss'

import pkg from './package.json'

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return id => pattern.test(id)
}

const ensureArray = maybeArr =>
  Array.isArray(maybeArr) ? maybeArr : [maybeArr]

const createConfig = ({ output, min = false, env } = {}) => ({
  input: 'src/index.js',
  output: ensureArray(output).map(format =>
    Object.assign({}, format, {
      name: 'ReactColorTools',
      exports: 'named',
      globals: {
        react: 'React',
        '@ctrl/tinycolor': 'TinyColor',
        'clipboard-polyfill': 'Clipboard',
        'prop-types': 'PropTypes',
        randomcolor: 'generateColors',
        'react-color-extractor': 'ColorExtractor',
        tinygradient: 'gradient',
        'values.js': 'Values',
        emotion: 'emotion',
        'react-emotion': 'styled'
      }
    })
  ),
  external: makeExternalPredicate([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]),
  plugins: [
    postcss(),
    filesize(),
    babel({ plugins: ['external-helpers'] }),
    env && replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    min && uglify()
  ].filter(Boolean)
})

export default [
  createConfig({
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }),
  createConfig({
    output: { file: pkg.unpkg, format: 'umd' },
    env: 'production',
    min: true
  })
]
