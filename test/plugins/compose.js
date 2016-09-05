// vendor modules

import test from 'ava';

// modules

import mappr from '../../lib';

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
  mapper = mappr.compose(
    { name: ({ firstName, lastName }) => `${firstName} ${lastName}` },
    { address: ({ city, street, streetNumber }) => `${street} ${streetNumber}, ${city}` },
  );
  // test
  result = mapper(pojo);
  // verify
  t.is(result.name, 'Dieter Luypaert');
  t.is(result.address, 'Rue Mode Vliebergh 18, Laken');
});

test('should not merge undefined', (t) => {
  // setup
  mapper = mappr.compose(
    { city: 'city' },
    { address: () => undefined },
  );
  // test
  result = mapper(pojo);
  // verify
  t.deepEqual(result, { city: 'Laken' });
});
