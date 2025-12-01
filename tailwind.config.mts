import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1677ff',
        },
      },
      borderRadius: {
        lg: '8px',
      },
    },
  },
  plugins: [],
}

export default config


