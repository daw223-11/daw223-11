import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['ckeditor5-custom-build']
  },
  resolve: {
    alias: {
      'ckeditor5-custom-build': './ckeditor5'
    }
  },
  commonjsOptions: {
    exclude: ['ckeditor5-custom-build'],
    include: []
  }
})
