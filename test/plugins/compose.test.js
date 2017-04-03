/* eslint-env jest */

import mappr from '../../lib';

// fixture

const pojo = {
  firstName: 'Dieter',
  lastName: 'Luypaert',
  city: 'Laken',
  street: 'Rue Mode Vliebergh',
  streetNumber: '18',
};

// private

let mapper, result;

// tests

it('should merge mapper results into one object', () => {
  // setup
  mapper = mappr.compose(
    { name: ({ firstName, lastName }) => `${firstName} ${lastName}` },
    { address: ({ city, street, streetNumber }) => `${street} ${streetNumber}, ${city}` },
  );
  // test
  result = mapper(pojo);
  // verify
  expect(result.name).toBe('Dieter Luypaert');
  expect(result.address).toBe('Rue Mode Vliebergh 18, Laken');
});

it('should not merge undefined', () => {
  // setup
  mapper = mappr.compose(
    { city: 'city' },
    { address: () => undefined },
  );
  // test
  result = mapper(pojo);
  // verify
  expect(result.address).toBeUndefined();
  expect(result.city).toBe('Laken');
});
