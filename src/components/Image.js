import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ src, ...rest }) => (
  <img src={src} alt="image" style={{ width: '228px' }} {...rest} />
)

Image.propTypes = {
  src: PropTypes.string
}

export default Image
