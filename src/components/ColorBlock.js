import React from 'react'
import styled from 'react-emotion'

const Block = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 110px;
  background: ${props => props.color.toHexString()};
  border-radius: 6px 6px 0px 0px;
`

// Displays a color block with the active color hex code
const ColorBlock = ({ color, children }) => (
  <Block color={color}>{children}</Block>
)

export default ColorBlock
