import React from 'react'

const Image = ({ src, ...rest }) => (
  <img src={src} alt="image" style={{ width: '228px' }} {...rest} />
)

export default Image
