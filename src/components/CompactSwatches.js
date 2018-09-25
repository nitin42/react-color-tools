import React from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'

const Swatch = ({ color, updateSwatch }) => (
  <div
    className={css`
      background: ${color};
      width: 25px;
      height: 25px;
    `}
    onClick={e => updateSwatch(color)}
  />
)

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
  updateSwatch: PropTypes.func.isRequired
}

export const CompactSwatches = ({ schemes, updateSwatch }) => (
  <div
    className={css`
      display: grid;
      grid-template-columns: repeat(30, 25px);
      grid-gap: 1px;
      margin-top: 10px;
      overflow-x: auto;
      width: 100%;
      height: 34px;
    `}
  >
    {schemes.map((scheme, i) => (
      <Swatch updateSwatch={updateSwatch} color={scheme} key={i} />
    ))}
  </div>
)

CompactSwatches.propTypes = {
  schemes: PropTypes.array.isRequired,
  updateSwatch: PropTypes.func.isRequired
}
