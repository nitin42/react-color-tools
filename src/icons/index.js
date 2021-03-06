import React from 'react'
import styled from 'react-emotion'

const StyledSVG = styled('svg')`
  display: inline-block;
  width: 20px;
  position: relative;
  top: 8px;
  left: -5px;
`

const ToolsSVG = styled('svg')`
  cursor: pointer;
`

export const createStyledSVG = ({
  height,
  width,
  viewBox,
  color,
  title,
  d,
  ...rest
}) => (
  <StyledSVG width={width} height={height} viewBox={viewBox} {...rest}>
    <title>{title}</title>
    <path fill={color} d={d} />
  </StyledSVG>
)

export const createToolsSVG = ({
  height,
  width,
  viewBox,
  color,
  title,
  d,
  ...rest
}) => (
  <ToolsSVG width={width} height={height} viewBox={viewBox} {...rest}>
    <title>{title}</title>
    <path fill={color} d={d} />
  </ToolsSVG>
)

export const SaturatorIcon = ({ width, height, color }) =>
  createStyledSVG({
    height,
    width,
    color,
    title: 'color saturator',
    viewBox: '0 0 24 24',
    d:
      'M12 15.422l3.75 2.25-0.984-4.266 3.328-2.906-4.406-0.375-1.688-4.031v9.328zM21.984 9.234l-5.438 4.734 1.641 7.031-6.188-3.75-6.188 3.75 1.641-7.031-5.438-4.734 7.172-0.609 2.813-6.609 2.813 6.609z'
  })

export const DesaturatorIcon = ({ width, height, color }) =>
  createStyledSVG({
    height,
    width,
    color,
    title: 'color desaturator',
    viewBox: '0 0 26 28',
    d:
      'M23.859 22.625c1.172 1.859 0.344 3.375-1.859 3.375h-18c-2.203 0-3.031-1.516-1.859-3.375l7.859-12.391v-6.234h-1c-0.547 0-1-0.453-1-1s0.453-1 1-1h8c0.547 0 1 0.453 1 1s-0.453 1-1 1h-1v6.234zM11.688 11.297l-4.25 6.703h11.125l-4.25-6.703-0.313-0.484v-6.813h-2v6.813z'
  })

export const ColorSpinIcon = ({ width, height, color }) =>
  createStyledSVG({
    height,
    width,
    color,
    title: 'color spin',
    viewBox: '0 0 24 28',
    d:
      'M23.609 16.5c0 0.031 0 0.078-0.016 0.109-1.328 5.531-5.891 9.391-11.656 9.391-3.047 0-6-1.203-8.219-3.313l-2.016 2.016c-0.187 0.187-0.438 0.297-0.703 0.297-0.547 0-1-0.453-1-1v-7c0-0.547 0.453-1 1-1h7c0.547 0 1 0.453 1 1 0 0.266-0.109 0.516-0.297 0.703l-2.141 2.141c1.469 1.375 3.422 2.156 5.437 2.156 2.781 0 5.359-1.437 6.813-3.813 0.375-0.609 0.562-1.203 0.828-1.828 0.078-0.219 0.234-0.359 0.469-0.359h3c0.281 0 0.5 0.234 0.5 0.5zM24 4v7c0 0.547-0.453 1-1 1h-7c-0.547 0-1-0.453-1-1 0-0.266 0.109-0.516 0.297-0.703l2.156-2.156c-1.484-1.375-3.437-2.141-5.453-2.141-2.781 0-5.359 1.437-6.813 3.813-0.375 0.609-0.562 1.203-0.828 1.828-0.078 0.219-0.234 0.359-0.469 0.359h-3.109c-0.281 0-0.5-0.234-0.5-0.5v-0.109c1.344-5.547 5.953-9.391 11.719-9.391 3.063 0 6.047 1.219 8.266 3.313l2.031-2.016c0.187-0.187 0.438-0.297 0.703-0.297 0.547 0 1 0.453 1 1z'
  })

export const ColorDarkenerIcon = ({ width, height, color }) =>
  createStyledSVG({
    height,
    width,
    color,
    title: 'color darkener',
    viewBox: '0 0 32 32',
    d:
      'M24.633 22.184c-8.188 0-14.82-6.637-14.82-14.82 0-2.695 0.773-5.188 2.031-7.363-6.824 1.968-11.844 8.187-11.844 15.644 0 9.031 7.32 16.355 16.352 16.355 7.457 0 13.68-5.023 15.648-11.844-2.18 1.254-4.672 2.028-7.367 2.028z'
  })

export const ColorBrightenerIcon = ({ width, height, color }) =>
  createStyledSVG({
    height,
    width,
    color,
    title: 'color brightener',
    viewBox: '0 0 32 32',
    d:
      'M16 9c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7c0-3.859-3.141-7-7-7zM16 21c-2.762 0-5-2.238-5-5s2.238-5 5-5 5 2.238 5 5-2.238 5-5 5zM16 7c0.552 0 1-0.448 1-1v-2c0-0.552-0.448-1-1-1s-1 0.448-1 1v2c0 0.552 0.448 1 1 1zM16 25c-0.552 0-1 0.448-1 1v2c0 0.552 0.448 1 1 1s1-0.448 1-1v-2c0-0.552-0.448-1-1-1zM23.777 9.635l1.414-1.414c0.391-0.391 0.391-1.023 0-1.414s-1.023-0.391-1.414 0l-1.414 1.414c-0.391 0.391-0.391 1.023 0 1.414s1.023 0.391 1.414 0zM8.223 22.365l-1.414 1.414c-0.391 0.391-0.391 1.023 0 1.414s1.023 0.391 1.414 0l1.414-1.414c0.391-0.392 0.391-1.023 0-1.414s-1.023-0.392-1.414 0zM7 16c0-0.552-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1h2c0.552 0 1-0.448 1-1zM28 15h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1h2c0.552 0 1-0.448 1-1s-0.448-1-1-1zM8.221 9.635c0.391 0.391 1.024 0.391 1.414 0s0.391-1.023 0-1.414l-1.414-1.414c-0.391-0.391-1.023-0.391-1.414 0s-0.391 1.023 0 1.414l1.414 1.414zM23.779 22.363c-0.392-0.391-1.023-0.391-1.414 0s-0.392 1.023 0 1.414l1.414 1.414c0.391 0.391 1.023 0.391 1.414 0s0.391-1.023 0-1.414l-1.414-1.414z'
  })

export const ImagePickerIcon = ({ width, height, color, id }) =>
  createToolsSVG({
    height,
    width,
    id,
    color,
    title: 'image picker',
    viewBox: '0 0 30 28',
    d:
      'M10 9c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM26 15v7h-22v-3l5-5 2.5 2.5 8-8zM27.5 4h-25c-0.266 0-0.5 0.234-0.5 0.5v19c0 0.266 0.234 0.5 0.5 0.5h25c0.266 0 0.5-0.234 0.5-0.5v-19c0-0.266-0.234-0.5-0.5-0.5zM30 4.5v19c0 1.375-1.125 2.5-2.5 2.5h-25c-1.375 0-2.5-1.125-2.5-2.5v-19c0-1.375 1.125-2.5 2.5-2.5h25c1.375 0 2.5 1.125 2.5 2.5z'
  })

export const ShadesGeneratorIcon = ({ width, height, color }) =>
  createToolsSVG({
    height,
    width,
    color,
    title: 'shades generator',
    viewBox: '0 0 24 28',
    d:
      'M12 22.5v-17c-4.688 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z'
  })

export const TintsGeneratorIcon = ({ width, height, color }) =>
  createToolsSVG({
    height,
    width,
    color,
    title: 'tints generator',
    viewBox: '0 0 16 28',
    d:
      'M8 18c0-0.391-0.125-0.766-0.313-1.078-0.203-0.313-1.031-1.375-1.359-2.422-0.047-0.172-0.203-0.25-0.328-0.25s-0.281 0.078-0.328 0.25c-0.328 1.047-1.156 2.109-1.359 2.422-0.187 0.313-0.313 0.688-0.313 1.078 0 1.109 0.891 2 2 2s2-0.891 2-2zM16 16c0 4.422-3.578 8-8 8s-8-3.578-8-8c0-1.578 0.484-3.047 1.266-4.297 0.797-1.25 4.141-5.484 5.406-9.703 0.203-0.672 0.828-1 1.328-1s1.141 0.328 1.328 1c1.266 4.219 4.609 8.453 5.406 9.703s1.266 2.719 1.266 4.297z'
  })

export const ClipboardIcon = ({ width, height, color }) =>
  createToolsSVG({
    height,
    width,
    color,
    title: 'clipboard',
    viewBox: '0 0 20 20',
    d:
      'M15.6 2l-1.2 3h-8.8l-1.2-3c-0.771 0-1.4 0.629-1.4 1.4v15.2c0 0.77 0.629 1.4 1.399 1.4h11.2c0.77 0 1.4-0.631 1.4-1.4v-15.2c0.001-0.771-0.63-1.4-1.399-1.4zM13.6 4l0.9-2h-2.181l-0.719-2h-3.2l-0.72 2h-2.18l0.899 2h7.201z'
  })

export const SwatchesGeneratorIcon = ({ width, height, color }) =>
  createToolsSVG({
    height,
    width,
    color,
    title: 'swatches generator',
    viewBox: '0 0 24 24',
    d:
      'M17.484 12c0.844 0 1.5-0.656 1.5-1.5s-0.656-1.5-1.5-1.5-1.5 0.656-1.5 1.5 0.656 1.5 1.5 1.5zM14.484 8.016c0.844 0 1.5-0.656 1.5-1.5s-0.656-1.5-1.5-1.5-1.5 0.656-1.5 1.5 0.656 1.5 1.5 1.5zM9.516 8.016c0.844 0 1.5-0.656 1.5-1.5s-0.656-1.5-1.5-1.5-1.5 0.656-1.5 1.5 0.656 1.5 1.5 1.5zM6.516 12c0.844 0 1.5-0.656 1.5-1.5s-0.656-1.5-1.5-1.5-1.5 0.656-1.5 1.5 0.656 1.5 1.5 1.5zM12 3c4.969 0 9 3.609 9 8.016 0 2.766-2.25 4.969-5.016 4.969h-1.734c-0.844 0-1.5 0.656-1.5 1.5 0 0.375 0.141 0.703 0.375 0.984s0.375 0.656 0.375 1.031c0 0.844-0.656 1.5-1.5 1.5-4.969 0-9-4.031-9-9s4.031-9 9-9z'
  })

export const ResetIcon = ({ width, height, color }) =>
  createToolsSVG({
    height,
    width,
    color,
    title: 'reset state',
    viewBox: '0 0 32 32',
    d:
      'M32 16c0-8.836-7.164-16-16-16-8.837 0-16 7.164-16 16 0 8.837 7.163 16 16 16 8.836 0 16-7.163 16-16zM8 16l8-8v6h8v4h-8v6l-8-8z'
  })

export const GenerateGradientIcon = ({ width, height, color }) =>
  createToolsSVG({
    height,
    width,
    color,
    title: 'gradient generator',
    viewBox: '0 0 32 32',
    d:
      'M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z'
  })
