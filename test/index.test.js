/* eslint-env jest */

import mappr from '../lib';

// tests

it('should load default plugins', () => {
  // test
  expect(typeof mappr.array).toBe('function');
  expect(typeof mappr.compose).toBe('function');
  expect(typeof mappr.or).toBe('function');
  expect(typeof mappr.when).toBe('function');
});
