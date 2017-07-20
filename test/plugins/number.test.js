import mappr from '../../lib';

// tests

it('should convert number', () => {
  const mapper = mappr.number('key');
  const source = { key: '101' };
  expect(mapper(source)).toBe(101);
});

it('should not keep NaN', () => {
  const mapper = mappr.number('key');
  const source = { key: 'test' };
  expect(mapper(source)).toBe(undefined);
});
