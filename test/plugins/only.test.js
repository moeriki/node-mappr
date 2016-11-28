/* eslint-env jest */

// vendor modules

import { toUpper } from 'lodash';

// modules

import mappr from '../../lib';

// fixtures

const pojo = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
  key4: 'value4',
};

// private variables

let mapper, result;

// tests

it('onlyIf should run mappers only if primitive condition is truthy', () => {
  // setup
  mapper = mappr.compose({
    key5: mappr.onlyIf(true, 'key1', toUpper),
    key6: mappr.onlyIf(false, 'key2', toUpper),
    key7: mappr.onlyIf(1, 'key3', toUpper),
    key8: mappr.onlyIf(0, 'key4', toUpper),
  });
  // test
  result = mapper(pojo);
  // verify
  expect(result.key5).toBe('VALUE1');
  expect(result.key6).toBeUndefined();
  expect(result.key7).toBe('VALUE3');
  expect(result.key8).toBeUndefined();
});

it('onlyIf should run mappers only if condition returns truthy', () => {
  // setup
  mapper = mappr.compose({
    key5: mappr.onlyIf(() => true, 'key1', toUpper),
    key6: mappr.onlyIf(() => false, 'key2', toUpper),
    key7: mappr.onlyIf(() => 1, 'key3', toUpper),
    key8: mappr.onlyIf(() => 0, 'key4', toUpper),
  });
  // test
  result = mapper(pojo);
  // verify
  expect(result.key5).toBe('VALUE1');
  expect(result.key6).toBeUndefined();
  expect(result.key7).toBe('VALUE3');
  expect(result.key8).toBeUndefined();
});

it('onlyUnless should run mappers only if primitive condition is falsy', () => {
  // setup
  mapper = mappr.compose({
    key5: mappr.onlyUnless(true, 'key1', toUpper),
    key6: mappr.onlyUnless(false, 'key2', toUpper),
    key7: mappr.onlyUnless(1, 'key3', toUpper),
    key8: mappr.onlyUnless(0, 'key4', toUpper),
  });
  // test
  result = mapper(pojo);
  // verify
  expect(result.key5).toBeUndefined();
  expect(result.key6).toBe('VALUE2');
  expect(result.key7).toBeUndefined();
  expect(result.key8).toBe('VALUE4');
});

it('onlyUnless should run mappers only if condition returns false', () => {
  // setup
  mapper = mappr.compose({
    key5: mappr.onlyUnless(() => true, 'key1', toUpper),
    key6: mappr.onlyUnless(() => false, 'key2', toUpper),
    key7: mappr.onlyUnless(() => 1, 'key3', toUpper),
    key8: mappr.onlyUnless(() => 0, 'key4', toUpper),
  });
  // test
  result = mapper(pojo);
  // verify
  expect(result.key5).toBeUndefined();
  expect(result.key6).toBe('VALUE2');
  expect(result.key7).toBeUndefined();
  expect(result.key8).toBe('VALUE4');
});
