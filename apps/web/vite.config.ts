import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory and parent directories
  const env = loadEnv(mode, process.cwd(), '')
  
  const isProduction = env.NODE_ENV === 'production';
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: process.env.NODE_ENV === 'development' ? {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
          secure: false,
        },
      } : undefined,
      port: 3001,
      strictPort: true,
    },
    // Ensure Vite uses the correct base URL in production
    base: isProduction ? '/' : './',
    define: {
      'process.env': {
        VITE_API_URL: JSON.stringify(process.env.VITE_API_URL)
      },
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL || '/api')
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true,
      // Ensure the build includes a fallback for SPA routing
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    preview: {
      port: 3000,
      strictPort: true,
    }
  }
})
