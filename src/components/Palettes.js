import React from 'react'
import { css } from 'emotion'

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

export const Palettes = ({ schemes, smallPalettes, updatePalette }) => (
  <div
    className={css`
      display: grid;
      grid-template-columns: repeat(40, 25px);
      grid-gap: 3px;
      margin-top: 10px;
      overflow: scroll;
      width: 100%;
      height: 34px;
    `}
  >
    {schemes.map((scheme, i) => (
      <SmallPalette updatePalette={updatePalette} color={scheme} key={i} />
    ))}
  </div>
)
