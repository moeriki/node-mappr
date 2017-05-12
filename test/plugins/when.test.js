import { eq, get } from 'lodash/fp';

import mappr from '../../lib';

// private

const gt = (value1) => (value2) => value2 > value1;

// tests

describe('if', () => {

  it('should return if case', () => {
    const mapper = mappr.when(gt(18), () => 'adult', () => 'minor');
    expect(mapper(30)).toBe('adult');
  });

  it('should return else case', () => {
    const mapper = mappr.when(gt(18), () => 'adult', () => 'minor');
    expect(mapper(10)).toBe('minor');
  });

  it('should return undefined', () => {
    const mapper = mappr.when(() => true);
    expect(mapper('anything')).toBe(undefined);
  });

  it('should pass source to if-else functions', () => {
    const mapper = mappr.when('isToggle', get('key1'), get('key2'));
    expect(mapper({ isToggle: true, key1: 'value1', key2: 'value2' })).toBe('value1');
    expect(mapper({ isToggle: false, key1: 'value1', key2: 'value2' })).toBe('value2');
  });

  it('should pass source to nested if functions', () => {
    const mapper = mappr.when(
      () => true,
      mappr.when(
        (pojo) => pojo.key === 'value',
        get('key')
      )
    );
    expect(mapper({ key: 'value' })).toBe('value');
  });

});

describe('switch', () => {

  it('should run matcher flow with condition result', () => {
    const mapper = mappr.when(
      'getKey',
      mappr.match('ZERO', get('key0')),
      mappr.match('ONE', get('key1')),
      mappr.match(eq('TWO'), get('key2')),
      get('key3'),
    );
    expect(mapper({ getKey: 'ZERO', key0: 0 })).toBe(0);
    expect(mapper({ getKey: 'ONE', key1: 'value1' })).toBe('value1');
    expect(mapper({ getKey: 'TWO', key2: 'value2' })).toBe('value2');
    expect(mapper({ getKey: null, key3: 'value3' })).toBe('value3');
  });

  it('should return undefined if not match', () => {
    const mapper = mappr.when(
      'getKey',
      mappr.match('ONE', get('key1')),
    );
    expect(mapper({})).toBe(undefined);
  });

});
