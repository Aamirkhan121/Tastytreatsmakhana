import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  
  darkMode: 'class', // ✅ important
  theme: {
    extend: {
      animation: {
    marquee: 'marquee 20s linear infinite',
  },
  keyframes: {
    marquee: {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(-100%)' },
    },
  },
      blur: {
        '3xl': '64px',
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://tastytreatsmakhana.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
