import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://<user>.github.io/space-race-observatory/
const base = process.env.GITHUB_PAGES === 'true' ? '/space-race-observatory/' : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
