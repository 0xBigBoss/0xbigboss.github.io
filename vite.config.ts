import { defineConfig } from 'vite'
import { one } from 'one/vite'

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
  ],
})
