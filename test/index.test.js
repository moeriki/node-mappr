/* eslint-env jest */

// modules

import mappr from '../lib';

// tests

it('should load default plugins', () => {
  // test
  expect(typeof mappr.compose).toBe('function');
});
