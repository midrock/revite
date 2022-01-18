module.exports = {
  '*': [
    // 'yarn test:unit --bail --findRelatedTests',
  ],
  '*.{js,ts}': [
    'eslint --fix',
  ],
  '*.vue': [
    'eslint --fix',
    'stylelint **/*.vue --fix',
  ],
}
