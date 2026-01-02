import { createTamagui } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4'

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
