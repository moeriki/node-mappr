/* eslint-disable */

'use strict';

// vendor modules

var test = require('ava');

// modules

var mapprCommonJS = require('../index');
var mapprES = require('../lib');

// tests

test('should import ES module', (t) => {
  t.is(typeof mapprCommonJS, 'function');
  t.is(typeof mapprCommonJS.compose, 'function');
});

test('should import CommonJS module', (t) => {
  t.is(typeof mapprES.default, 'function');
  t.is(typeof mapprES.default.compose, 'function');
});
