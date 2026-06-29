import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
plugins: [react()],
  build: {
    sourcemap: false, // Disabling this saves massive RAM
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});