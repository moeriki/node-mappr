/* eslint-env jest */
/* eslint no-magic-numbers:0 */

// modules

import { apply, flow, get, pick, subtract, values } from 'lodash/fp';
import mappr from '../../lib';

// tests

it('should return first truthy value', () => {
  const pojo1 = {
    duration: 3,
  };
  const pojo2 = {
    start: 1,
    end: 4,
  };
  const mapper = mappr.first(
    get('duration'),
    flow([pick(['end', 'start']), values, apply(subtract)]),
  );
  // test
  const result1 = mapper(pojo1);
  const result2 = mapper(pojo2);
  // verify
  expect(result1).toBe(3);
  expect(result2).toBe(3);
});

it('should return null if no mappers', () => {
  const mapper = mappr.first();
  expect(mapper('test')).toBe(null);
});

it('should return null if no mapper returned truthy', () => {
  const mapper = mappr.first(
    () => null,
    () => false,
    () => 0,
    () => ''
  );
  expect(mapper('test')).toBe(null);
});
