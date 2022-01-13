module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  globals: {
    Revite: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  plugins: [
    'vue',
    'jest',
    'lodash',
    '@typescript-eslint',
  ],
  rules: {
    // Only allow debugger in development
    quotes: ['error', 'single'],
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    // Only allow `console.log` in development
    'no-console': process.env.PRE_COMMIT
      ? ['error', { allow: ['warn', 'error']}]
      : 'off',
    'no-useless-escape': 0,
    'no-unused-vars': ['warn'],
    'no-useless-constructor': 0,
    'no-unused-expressions': 0,
    camelcase: 0,
    'no-template-curly-in-string': 0,
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
    }],
    'vue/multiline-html-element-content-newline': 'error',
    'vue/singleline-html-element-content-newline': ['error', {
      ignoreWhenNoAttributes: true,
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea'],
    }],
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/component-name-in-template-casing': ['warn', 'kebab-case', {
      registeredComponentsOnly: false,
      ignores: [],
    }],
    'vue/component-definition-name-casing': ['warn', 'kebab-case'],
    'lines-between-class-members': ['error', 'always', {
      exceptAfterSingleLine: true,
    }],
    'vue/no-v-html': 'off',
    'vue/require-v-for-key': 'off',
    'vue/no-template-key': 'off',
    'vue/valid-v-for': 'off',
    'vue/comment-directive': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    indent: ['error', 2, {
      ignoredNodes: ['TemplateLiteral'],
      SwitchCase: 1,
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-even-spacing': 0,
    'object-curly-spacing': ['error', 'always', {
      arraysInObjects: false,
      objectsInObjects: false,
    }],
    'lodash/import-scope': [2, 'method'],
    'standard/object-curly-even-spacing': 0,
    'array-bracket-spacing': ['error', 'never'],
    'prefer-promise-reject-errors': 0,
    'computed-property-spacing': ['error', 'never'],
    'padding-line-between-statements': ['error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
      { blankLine: 'any', prev: 'directive', next: 'directive' },
      { blankLine: 'never', prev: 'import', next: 'import' },
    ],
    'template-curly-spacing': 'off',
    'import/no-absolute-path': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'snake_case'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'memberLike',
        format: ['camelCase', 'PascalCase', 'snake_case'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase', 'camelCase'],
      },
    ],
  },
}
