/* eslint-env jest */

import mappr from '../../lib';

// tests

it('should convert non array to array', () => {
  const mapper = mappr.array('key1');
  const pojo = {
    key1: 'Hello World!',
  };
  expect(mapper(pojo)).toEqual(['Hello World!']);
});

it('should return undefined if no items', () => {
  const mapper = mappr.array('key1');
  const pojo = {};
  expect(mapper(pojo)).toEqual(undefined);
});

it('should leave array untouched', () => {
  const mapper = mappr.array('key1');
  const pojo = {
    key1: ['Hello World!'],
  };
  expect(mapper(pojo)).toEqual(['Hello World!']);
});
