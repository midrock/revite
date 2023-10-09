/* eslint-disable */

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: [
    'dist',
    '.turbo',
    '*.json',
    'public',
  ],
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    __static: true,
    Pre: true,
    Prism: true,
    Service: true,
    Main: true,
    electron: true,
    Editor: true,
    Core: true,
    Vue: true,
  },
  plugins: [
    'vue',
    'lodash',
    'import',
    '@typescript-eslint',
  ],
  rules: {
    // Only allow debugger in development
    quotes: ['error', 'single'],
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    // Only allow `console.log` in development
    'no-console': process.env.PRE_COMMIT
      ? ['error', {allow: ['warn', 'error']}]
      : 'off',
    'no-useless-escape': 0,
    'no-unused-vars': 0,
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
    "vue/v-slot-style": ["error", {
      "atComponent": "longform",
      "default": "shorthand",
      "named": "shorthand",
    }],
    'vue/require-v-for-key': 'off',
    'vue/no-template-key': 'off',
    'vue/valid-v-for': 'off',
    'vue/prop-name-casing': 'off',
    'vue/comment-directive': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: 1,
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
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'any',
        prev: 'directive',
        next: 'directive',
      },
      {
        blankLine: 'never',
        prev: 'import',
        next: 'import',
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'ignore',
        alphabetize: {
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'index',
          'sibling',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '@rp/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{@}/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '**/*.vue',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '/~/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [
          'builtin',
        ],
      },
    ],
    'template-curly-spacing': 'off',
    'import/no-absolute-path': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/naming-convention': 0,
  },
}
