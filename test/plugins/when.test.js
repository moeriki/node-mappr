/* eslint-env jest */
/* eslint no-magic-numbers:0 */

// modules

import mappr from '../../lib';

// private functions

const gt = (value1) => (value2) => value2 > value1;

// tests

it('should return if case', () => {
  const mapper = mappr.when(gt(18), () => 'adult', () => 'minor');
  expect(mapper(30)).toBe('adult');
});

it('should return else case', () => {
  const mapper = mappr.when(gt(18), () => 'adult', () => 'minor');
  expect(mapper(10)).toBe('minor');
});

it('should return no if-else case');

it('should when then', () => {
  const mapper = mappr.when(
    'age',
    mappr.when(gt(59), () => 'senior'),
    mappr.when(gt(18), () => 'adult'),
    () => 'minor',
  );
  expect(mapper({ age: 10 })).toEqual('minor');
  expect(mapper({ age: 30 })).toEqual('adult');
  expect(mapper({ age: 60 })).toEqual('senior');
});
