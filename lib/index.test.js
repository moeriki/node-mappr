/* eslint-env jest */

// modules

import mappr from './index';

// tests

it('should load default plugins', () => {
  // test
  expect(typeof mappr.compose).toBe('function');
  expect(typeof mappr.onlyIf).toBe('function');
  expect(typeof mappr.onlyUnless).toBe('function');
});
