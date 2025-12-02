import type { Config } from 'tailwindcss'
import generatedColors from './src/foundations/styles/tailwind-colors.mjs'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...generatedColors,
      },
      borderRadius: {
        lg: '8px',
      },
    },
  },
  plugins: [],
}

export default config


