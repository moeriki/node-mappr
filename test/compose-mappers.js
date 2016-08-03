// vendor modules

import test from 'ava';
import { fp } from 'lodash';

// modules

import { composeMappers } from '../src';

// fixture

const pojo = {
  firstName: 'Dieter',
  lastName: 'Luypaert',
  city: 'Laken',
  street: 'Rue Mode Vliebergh',
  streetNumber: '18',
};

// private variables

let mapper, result;

// tests

test('should merge mapper results into one object', (t) => {
  // setup
  mapper = composeMappers(
    { name: ({ firstName, lastName }) => `${firstName} ${lastName}` },
    { address: ({ city, street, streetNumber }) => `${street} ${streetNumber}, ${city}` },
  );
  // test
  result = mapper(pojo);
  // verify
  t.is(result.name, 'Dieter Luypaert');
  t.is(result.address, 'Rue Mode Vliebergh 18, Laken');
});
