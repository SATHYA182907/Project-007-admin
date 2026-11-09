import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'framer-motion',
      'recharts',
      '@supabase/supabase-js',
      'clsx',
      'tailwind-merge',
      'date-fns',
    ],
  },
})

