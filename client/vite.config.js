import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'public/_redirects',
    //       dest: '' // copy to dist root
    //     }
    //   ]
    // })
  ],

  base: '/',
  
  build: {
    outDir: 'dist',
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['embla-carousel-react', 'embla-carousel-autoplay']
        }
      }
    }
  },

  server: {
    historyApiFallback: true,
    port : 5173
  }
})
