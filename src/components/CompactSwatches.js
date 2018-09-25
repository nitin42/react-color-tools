import React from 'react'
import { css } from 'emotion'
import PropTypes from 'prop-types'

const ENTER_KEY = 13

const Swatch = ({ color, updateSwatch }) => (
  <div
    className={css`
      background: ${color};
      width: 25px;
      height: 25px;
    `}
    onClick={() => updateSwatch(color)}
    onKeyDown={e => (e.keyCode === ENTER_KEY ? updateSwatch(color) : null)}
  />
)

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
  updateSwatch: PropTypes.func.isRequired
}

const CompactSwatches = ({ schemes, updateSwatch }) => (
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
    {schemes.map(scheme => (
      <Swatch updateSwatch={updateSwatch} color={scheme} key={scheme} />
    ))}
  </div>
)

CompactSwatches.propTypes = {
  schemes: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateSwatch: PropTypes.func.isRequired
}

export default CompactSwatches
