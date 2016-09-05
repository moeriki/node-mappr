// vendor modules

import test from 'ava';
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

test('onlyIf should run mappers only if primitive condition is truthy', (t) => {
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
  t.deepEqual(result, {
    key5: 'VALUE1',
    key7: 'VALUE3',
  });
});

test('onlyIf should run mappers only if condition returns truthy', (t) => {
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
  t.deepEqual(result, {
    key5: 'VALUE1',
    key7: 'VALUE3',
  });
});

test('onlyUnless should run mappers only if primitive condition is falsy', (t) => {
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
  t.deepEqual(result, {
    key6: 'VALUE2',
    key8: 'VALUE4',
  });
});

test('onlyUnless should run mappers only if condition returns false', (t) => {
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
  t.deepEqual(result, {
    key6: 'VALUE2',
    key8: 'VALUE4',
  });
});
