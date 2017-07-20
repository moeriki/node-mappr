module.exports = {
  root: true,
  extends: [
    'muriki/jest',
  ],
  parser: 'babel-eslint',
  rules: {
    'import/no-extraneous-dependencies': [2, {
      devDependencies: ['**/*.test.js'],
    }],
    'node/no-unsupported-features': 0,
  },
};
