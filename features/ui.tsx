/**
 * Re-export Tamagui components with correct types.
 *
 * This file exists because TypeScript has trouble inferring the full
 * set of style props on Tamagui's styled components. By re-exporting
 * through a simple wrapper, we can use the components with all their
 * runtime functionality while maintaining type safety for the props
 * we actually use.
 */
import {
  Text as TamaguiText,
  XStack as TamaguiXStack,
  YStack as TamaguiYStack,
  styled as tamaguiStyled,
} from 'tamagui'
import type { CSSProperties, ReactNode } from 'react'
import type { ViewStyle, TextStyle, GestureResponderEvent } from 'react-native'

// Common style props that Tamagui supports
type StackStyleProps = {
  // Layout
  alignItems?: ViewStyle['alignItems']
  justifyContent?: ViewStyle['justifyContent']
  flexDirection?: ViewStyle['flexDirection']
  flexWrap?: ViewStyle['flexWrap']
  flex?: ViewStyle['flex']
  gap?: number

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
  background?: string
  borderRadius?: number | string
  borderWidth?: number
  borderColor?: string
  opacity?: number
  overflow?: ViewStyle['overflow']

  // Position
  position?: ViewStyle['position']
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
  zIndex?: number

  // Transform
  rotate?: string
  scale?: number

  // Interaction
  cursor?: string
  hoverStyle?: Record<string, unknown>
  onPress?: (event: GestureResponderEvent) => void

  // Native style prop
  style?: CSSProperties | ViewStyle
}

type TextStyleProps = StackStyleProps & {
  fontSize?: number
  fontWeight?: TextStyle['fontWeight']
  fontFamily?: string
  fontStyle?: TextStyle['fontStyle']
  color?: string
  lineHeight?: number
  letterSpacing?: number
  textAlign?: TextStyle['textAlign']
  ta?: TextStyle['textAlign']
  textTransform?: TextStyle['textTransform']
  textShadowColor?: string
  textShadowOffset?: { width: number; height: number }
  textShadowRadius?: number
}

// Type-safe wrapper props
type XStackProps = StackStyleProps & {
  children?: ReactNode
}

type YStackProps = StackStyleProps & {
  children?: ReactNode
}

type TextProps = TextStyleProps & {
  children?: ReactNode
}

// Re-export with any cast to bypass TypeScript's complex generic inference issues
export const XStack = TamaguiXStack as unknown as React.FC<XStackProps>
export const YStack = TamaguiYStack as unknown as React.FC<YStackProps>
export const Text = TamaguiText as unknown as React.FC<TextProps>

// Export styled that returns properly typed components
// Using 'any' here because the styled() function has complex generics
// that don't play well with TypeScript's inference
export const styled: typeof tamaguiStyled = tamaguiStyled
