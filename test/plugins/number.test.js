/* eslint-env jest */

import mappr from '../../lib';

// tests

it('should convert number', () => {
  const mapper = mappr.number('key');
  const source = { key: '101' };
  expect(mapper(source)).toBe(101);
});
