module.exports = {
  'src/**/*.ts': () => 'tsc -p tsconfig.json --noEmit',
  'demo/**/*.{ts,vue}': () => 'vue-tsc -p tsconfig.json --noEmit',
  '*.{js,ts,vue}': [
    'eslint --fix',
  ],
  '*.{md,json,html}': [
    'prettier --write',
  ],
}
