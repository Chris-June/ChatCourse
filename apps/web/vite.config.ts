import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory and parent directories
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
          secure: false,
        },
      },
      port: 3001,
      strictPort: true,
    },
    // Ensure Vite uses the correct base URL in production
    base: './',
    define: {
      'process.env': {
        VITE_API_URL: JSON.stringify(process.env.VITE_API_URL || '')
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true,
    },
    preview: {
      port: 3000,
      strictPort: true,
    }
  }
})
