import { defineConfig } from 'vite'
import { one } from 'one/vite'
import { tamaguiPlugin } from '@tamagui/vite-plugin'

export default defineConfig({
  ssr: {
    noExternal: true,
    external: ['@vxrn/mdx'],
  },
  plugins: [
    one({
      web: {
        defaultRenderMode: 'ssg',
      },
    }),
    tamaguiPlugin({
      optimize: true,
      components: ['tamagui'],
      config: './config/tamagui.config.ts',
    }),
  ],
})
