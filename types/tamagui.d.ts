// Type augmentation for Tamagui to include style props
// This works around TypeScript not correctly inferring styled component props

import 'tamagui'
import type { CSSProperties } from 'react'

declare module 'tamagui' {
  // Extend the base stack props to include common CSS properties
  interface TamaguiComponentPropsBase {
    // Layout
    alignItems?: CSSProperties['alignItems']
    justifyContent?: CSSProperties['justifyContent']
    flexDirection?: CSSProperties['flexDirection']
    flexWrap?: CSSProperties['flexWrap']
    flex?: CSSProperties['flex']
    gap?: number | string

    // Sizing
    width?: number | string
    height?: number | string
    maxWidth?: number | string
    minWidth?: number | string
    maxHeight?: number | string
    minHeight?: number | string

    // Spacing
    margin?: number | string
    marginTop?: number | string
    marginBottom?: number | string
    marginLeft?: number | string
    marginRight?: number | string
    marginHorizontal?: number | string
    marginVertical?: number | string
    padding?: number | string
    paddingTop?: number | string
    paddingBottom?: number | string
    paddingLeft?: number | string
    paddingRight?: number | string
    paddingHorizontal?: number | string
    paddingVertical?: number | string

    // Visual
    backgroundColor?: string
    borderRadius?: number | string
    borderWidth?: number
    borderColor?: string
    opacity?: number
    overflow?: CSSProperties['overflow']

    // Position
    position?: CSSProperties['position']
    top?: number | string
    bottom?: number | string
    left?: number | string
    right?: number | string
    zIndex?: number

    // Transform
    rotate?: string
    scale?: number

    // Other
    cursor?: CSSProperties['cursor']
  }
}
