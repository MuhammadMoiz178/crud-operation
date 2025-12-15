import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
  proxy:{
    '/api':{
      // target:'http://localhost:8000',
      target:'https://backend-crud-operation-hazel.vercel.app',
      secure:false
    },
  },
},
  plugins: [react()],
})
