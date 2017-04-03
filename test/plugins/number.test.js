/* eslint-env jest */

import mappr from '../../lib';

// tests

it('should convert number', () => {
  const mapper = mappr.number('key');
  const pojo = { key: '101' };
  expect(mapper(pojo)).toBe(101);
});
