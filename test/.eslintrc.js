module.exports = {
  root: true,
  extends: [
    'muriki',
    'muriki/env/test',
    'muriki/plugin/jasmine',
    'muriki/es/2015',
    'muriki/es/modules',
  ],
  parser: 'babel-eslint',
};
