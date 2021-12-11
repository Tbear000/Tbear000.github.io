const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    outDir: resolve(__dirname, 'docs')
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'contact/index.html'),
        nested: resolve(__dirname, 'examples/index.html')
      }
    }
  }
})