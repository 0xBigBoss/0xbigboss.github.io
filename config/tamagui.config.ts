import { createTamagui } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4'
import { createAnimations } from '@tamagui/animations-css'

// CSS animation presets
const animations = createAnimations({
  fast: 'ease-out 150ms',
  medium: 'ease-out 300ms',
  slow: 'ease-out 450ms',
  quick: 'ease-out 100ms',
  bouncy: 'cubic-bezier(0.175, 0.885, 0.32, 1.275) 300ms',
  lazy: 'ease-in-out 500ms',
})

// Gothic color palette
const gothicColors = {
  gold: '#c9a227',
  textPrimary: '#e8e8f0',
  textSecondary: '#a0a0b0',
  codeBg: '#12121f',
  cardBorder: '#2a2a4a',
  background: '#0a0a12',
}

export const config = createTamagui({
  ...defaultConfig,
  animations,
  settings: {
    ...defaultConfig.settings,
    styleCompat: 'react-native',
  },
  themes: {
    ...defaultConfig.themes,
    gothic: {
      background: gothicColors.background,
      backgroundHover: gothicColors.codeBg,
      backgroundPress: gothicColors.codeBg,
      backgroundFocus: gothicColors.codeBg,
      color: gothicColors.textPrimary,
      colorHover: gothicColors.gold,
      colorPress: gothicColors.gold,
      colorFocus: gothicColors.gold,
      borderColor: gothicColors.cardBorder,
      borderColorHover: gothicColors.gold,
      borderColorPress: gothicColors.gold,
      borderColorFocus: gothicColors.gold,
    },
  },
})

export default config

type CustomConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends CustomConfig {}
}
