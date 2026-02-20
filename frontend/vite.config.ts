import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    
    base: '/',
    
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        modulePreload: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-chartjs-2', 'wordcloud']
                }
            }
        }
    },
    
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: false,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: (path) => path
            }
        }
    },
    
    preview: {
        port: 5173,
        strictPort: false
    }
})
