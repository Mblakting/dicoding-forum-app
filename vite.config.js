import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    globals: true,
    pool: 'vmForks',
    alias: {
      'react-redux-loading-bar': new URL('./src/__mocks__/react-redux-loading-bar.js', import.meta.url).pathname,
    },
  },
})
