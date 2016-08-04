// vendor modules

import test from 'ava';

// modules

import { createMapper, format } from '../src';

// tests

test('should apply multiple mappers', (t) => {
  // setup
  const pojo = { name: 'John H. Benjamin' };
  const mapper = createMapper({
    name: format(
      'name',
      (name) => name.toUpperCase(),
      (name) => name.split('').reverse().join(''),
    ),
  });
  // test
  const result = mapper(pojo);
  // verify
  t.is(result.name, 'NIMAJNEB .H NHOJ');
});
