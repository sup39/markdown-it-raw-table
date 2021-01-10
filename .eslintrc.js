module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'google',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: [
    'node_modules/',
    'lib/table.js',
  ],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'indent': ['error', 2, {'MemberExpression': 1}],
  },
};
