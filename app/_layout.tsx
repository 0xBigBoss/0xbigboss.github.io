import '@tamagui/core/reset.css'
import { Slot } from 'one'
import { TamaguiProvider } from 'tamagui'
import { SchemeProvider, useUserScheme } from '@vxrn/color-scheme'
import config from '../config/tamagui.config'
import type { ReactNode } from 'react'

function ThemeProvider({ children }: { children: ReactNode }) {
  const userScheme = useUserScheme()
  return (
    <TamaguiProvider config={config} defaultTheme={userScheme.value ?? 'dark'}>
      {children}
    </TamaguiProvider>
  )
}

export default function Layout() {
  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="author" content="Allen Eubank" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" />

        {/* Theme Color */}
        <meta name="theme-color" content="#0a0a12" />
      </head>

      <SchemeProvider>
        <ThemeProvider>
          <Slot />
        </ThemeProvider>
      </SchemeProvider>
    </html>
  )
}
