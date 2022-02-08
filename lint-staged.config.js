module.exports = {
  'src/**/*.ts': () => 'tsc -p tsconfig.json --noEmit',
  'demo/**/*.{ts,vue}': () => 'vue-tsc -p tsconfig.json --noEmit',
  '*.{js,ts}': [
    'eslint --fix',
  ],
  '*.vue': [
    'eslint --fix',
    'stylelint **/*.vue --fix',
  ],
}
