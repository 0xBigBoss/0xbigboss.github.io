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

        {/* Primary Meta Tags */}
        <title>Allen Eubank | Big Boss</title>
        <meta name="title" content="Allen Eubank | Big Boss" />
        <meta name="description" content="Builder and engineer. We can build anything we want given enough time." />
        <meta name="author" content="Allen Eubank" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://0xbigboss.github.io/" />
        <meta property="og:title" content="Allen Eubank | Big Boss" />
        <meta property="og:description" content="Builder and engineer. We can build anything we want given enough time." />
        <meta property="og:image" content="https://0xbigboss.github.io/images/heroes/home.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zeroxBigBoss" />
        <meta name="twitter:creator" content="@zeroxBigBoss" />
        <meta name="twitter:title" content="Allen Eubank | Big Boss" />
        <meta name="twitter:description" content="Builder and engineer. We can build anything we want given enough time." />
        <meta name="twitter:image" content="https://0xbigboss.github.io/images/heroes/home.png" />

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
