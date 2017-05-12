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
  const mapper = mappr.or(
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

it('should return undefined if no mappers', () => {
  const mapper = mappr.or();
  expect(mapper('test')).toBe(undefined);
});

it('should return last result if no mapper returned truthy', () => {
  const mapper = mappr.or(
    () => null,
    () => false,
    () => 0,
    () => ''
  );
  expect(mapper('test')).toBe('');
});
