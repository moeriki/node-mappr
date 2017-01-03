module.exports = {
  root: true,
  extends: [
    'muriki',
    'muriki/env/test',
    'muriki/plugins/jasmine',
    'muriki/es/2015',
    'muriki/es/modules',
  ],
  parser: 'babel-eslint',
  rules: {
    'import/no-extraneous-dependencies': [2, {
      devDependencies: ['**/*.test.js'],
    }],
  },
};
