import React from 'react'
import styled from 'react-emotion'

const ColorPickerContainer = styled('div')`
	width: ${props => props.width || '200px'};
	background: ${props => props.background || 'rgb(255, 255, 255)'};
	box-shadow: rgba(0, 0, 0, 0.1) 0px 1px;
	border-radius: 6px;
	position: relative;
`

// Main color picker container
const Container = ({ children, width, background }) => (
	<ColorPickerContainer width={width} background={background}>
		{children}
	</ColorPickerContainer>
)

export default Container
