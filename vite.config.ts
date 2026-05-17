import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      '/users': { target: 'http://localhost:8000', changeOrigin: true },
      '/chatbot': { target: 'http://localhost:8000', changeOrigin: true },
      '/ml': { target: 'http://localhost:8000', changeOrigin: true },
      '/farms': { target: 'http://localhost:8000', changeOrigin: true },
      '/billing': { target: 'http://localhost:8000', changeOrigin: true },
      '/feedback': { target: 'http://localhost:8000', changeOrigin: true },
      '/cv': { target: 'http://localhost:8000', changeOrigin: true }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion', 'gsap'],
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    }
  }
});
