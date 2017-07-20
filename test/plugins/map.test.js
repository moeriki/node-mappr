import mappr from '../../lib';

// private

let mapper, result;

// tests

it('should map over source', () => {
  mapper = mappr.map((source) => source.value);
  result = mapper([
    { value: 'test1' },
    { value: 'test2' },
  ]);
  expect(result).toEqual(['test1', 'test2']);
});

it('should pass all additional args', () => {
  mapper = mappr.map((source, { addition1 }, { addition2 }) =>
    source.value + addition1 + addition2
  );
  result = mapper([
    { value: 1 },
    { value: 2 },
  ], { addition1: 4 }, { addition2: 8 });
  expect(result).toEqual([13, 14]);
});
