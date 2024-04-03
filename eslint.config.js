// eslint.config.js
// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  formatters: true,
  ignores: [
    'node_modules/',
    'public/',
    'dist/',
  ],
})
