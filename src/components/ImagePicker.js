import React from 'react'
import { Consumer } from '../utils/context'

const ImagePicker = ({ uploadImage }) => (
  <Consumer>
    {color => (
      <span title="Image picker">
        <input
          id="uploader"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={uploadImage}
        />
        <i id="image-icon" className="fas fa-image" style={{ color }} />
      </span>
    )}
  </Consumer>
)

export default ImagePicker
