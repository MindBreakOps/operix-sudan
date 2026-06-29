export default defineConfig({
  build: {
    sourcemap: false, // Disabling this saves massive RAM
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});