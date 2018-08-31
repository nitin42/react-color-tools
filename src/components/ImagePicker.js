import React from 'react'
import { css } from 'emotion'

const ImagePicker = props => (
	<div
		className={css`
			margin-top: 10px;
			display: flex;
			justify-content: center;
			cursor: pointer;
		`}
	>
		{' '}
		<input id="uploader" style={{ display: 'none' }} type="file" accept="image/*" onChange={props.uploadFiles} />
		<i id="image-icon" className="far fa-image" />
	</div>
)

export default ImagePicker
