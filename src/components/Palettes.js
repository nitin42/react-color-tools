import React from 'react'
import { css } from 'emotion'

export const BigPalette = ({ color, updatePalette }) => (
  <div
    className={css`
      background: ${color};
      width: 50px;
      height: 100px;
      border-radius: 1px;
    `}
    onClick={e => updatePalette(color)}
  />
)

export const SmallPalette = ({ color, updatePalette }) => (
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

export const Palettes = ({ schemes, small, updatePalette }) => (
  <div
    className={css`
      display: grid;
      grid-template-columns: repeat(40, ${small ? '25px' : '50px'});
      grid-gap: 3px;
      margin-top: 10px;
      overflow: scroll;
      width: 100%;
      height: ${small ? '34px' : '108px'};
    `}
  >
    {schemes
      .reverse()
      .map(
        (scheme, i) =>
          small ? (
            <SmallPalette
              updatePalette={updatePalette}
              color={scheme}
              key={i}
            />
          ) : (
            <BigPalette updatePalette={updatePalette} color={scheme} key={i} />
          )
      )}
  </div>
)
