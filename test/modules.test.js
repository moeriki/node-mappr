import cjs from '../dist';

// tests

it('should import CJS module', () => {
  expect(typeof cjs).toBe('function');
  expect(typeof cjs.compose).toBe('function');
});
