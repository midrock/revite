module.exports = {
  preset: 'vite-jest',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  testEnvironment: 'jest-environment-node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['vue', 'js', 'json', 'ts'],
  verbose: true,
  testMatch: ['<rootDir>/**/*.spec.ts'],
  moduleNameMapper: {
    revite: '<rootDir>/src',
    '/~': '<rootDir>/',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js?$': 'babel-jest',
  },
}
