/* eslint-env jest */

// modules

import mappr from '../lib';

// tests

it('should load default plugins', () => {
  // test
  expect(typeof mappr.array).toBe('function');
  expect(typeof mappr.compose).toBe('function');
  expect(typeof mappr.first).toBe('function');
  expect(typeof mappr.when).toBe('function');
});
