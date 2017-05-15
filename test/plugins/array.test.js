import mappr from '../../lib';

// tests

it('should convert non array to array', () => {
  const mapper = mappr.array('key1');
  const source = {
    key1: 'Hello World!',
  };
  expect(mapper(source)).toEqual(['Hello World!']);
});

it('should return undefined if no items', () => {
  const mapper = mappr.array('key1');
  const source = {};
  expect(mapper(source)).toEqual(undefined);
});

it('should leave array untouched', () => {
  const mapper = mappr.array('key1');
  const source = {
    key1: ['Hello World!'],
  };
  expect(mapper(source)).toEqual(['Hello World!']);
});
