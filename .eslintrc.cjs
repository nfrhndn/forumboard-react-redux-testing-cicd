module.exports = {
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'storybook-static/',
    'coverage/',
    'cypress/screenshots/',
    'cypress/videos/'
  ],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    // Custom rules or overrides can go here
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
