/* eslint-env jest */

'use strict';

// modules

var mapprCommonJS = require('./index');
var mapprES = require('./es');

// tests

it('should import ES module', () => {
  expect(typeof mapprCommonJS).toBe('function');
  expect(typeof mapprCommonJS.compose).toBe('function');
});

it('should import CommonJS module', () => {
  expect(typeof mapprES.default).toBe('function');
  expect(typeof mapprES.default.compose).toBe('function');
});
