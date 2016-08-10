// vendor modules

import test from 'ava';

// modules

import mappr from '../src'; // eslint-disable-line import/no-named-as-default

// fixture

const pojo = {
  gender: 'male',
  firstName: 'Dieter',
  lastName: 'Luypaert',
  address: {
    city: 'Laken',
    street: 'Rue Mode Vliebergh',
    streetNumber: '18',
  },
};

// private functions

function setupAndTest() {
  // setup
  const mapper = mappr({
    gender: 'gender',
    name: {
      first: 'firstName',
      last: 'lastName',
    },
    city: 'address.city',
    address: { street: (_pojo) => `${_pojo.address.street} ${_pojo.address.streetNumber}` },
  });
  // test
  return mapper(pojo);
}

// tests

test('should map root level property', (t) => {
  // setup & test
  const result = setupAndTest();
  // verify
  t.is(result.gender, 'male');
});

test('should map root level property to nested property', (t) => {
  // setup & test
  const result = setupAndTest();
  // verify
  t.deepEqual(result.name, {
    first: 'Dieter',
    last: 'Luypaert',
  });
});

test('should map nested property to root level property', (t) => {
  // setup & test
  const result = setupAndTest();
  // verify
  t.is(result.city, 'Laken');
});

test('should map using custom mapper', (t) => {
  // setup & test
  const result = setupAndTest();
  // verify
  t.is(result.address.street, 'Rue Mode Vliebergh 18');
});

test('should throw if mapper is no function|object|string', (t) => {
  // setup
  const mapper = mappr({ key: true });
  // true is not a valid mapper
  t.throws(() => mapper({}));
});

test('should apply multiple formatters', (t) => {
  // setup
  const user = { name: 'John H. Benjamin' };
  const mapper = mappr(
    'name',
    (name) => name.toUpperCase(),
    (name) => name.split('').reverse().join(''),
  );
  // test
  const name = mapper(user);
  // verify
  t.is(name, 'NIMAJNEB .H NHOJ');
});
