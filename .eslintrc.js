module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": "off",
    "react/no-array-index-key": "off",
    "react-hooks/exhaustive-deps": "off"
  },
  ignorePatterns: [
    'src/index.js', 
    'src/reportWebVitals.js', 
    'src/setupTests.js', 
    'src/App.js', 
    'src/Board.js',
  ],
};
