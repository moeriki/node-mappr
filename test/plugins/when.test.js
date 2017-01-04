/* eslint-env jest */
/* eslint no-magic-numbers:0 */

// modules

import { get } from 'lodash/fp';

import mappr from '../../lib';

// private functions

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

});

describe('switch', () => {

  it('should run if case with pojo', () => {
    const mapper = mappr.when('isToggle', get('key1'), get('key2'));
    expect(mapper({ isToggle: true, key1: 'value1', key2: 'value2' })).toBe('value1');
    expect(mapper({ isToggle: false, key1: 'value1', key2: 'value2' })).toBe('value2');
  });

  it('should run cases with condition result', () => {
    const mapper = mappr.when(
      'getKey',
      mappr.when('ONE', get('key1')),
      mappr.when('TWO', get('key2')),
      get('key3'),
    );
    expect(mapper({ getKey: 'ONE', key1: 'value1' })).toBe('value1');
    expect(mapper({ getKey: 'TWO', key2: 'value2' })).toBe('value2');
    expect(mapper({ getKey: null, key3: 'value3' })).toBe('value3');
  });

  it('should return undefined if not match', () => {
    const mapper = mappr.when(
      'getKey',
      mappr.when('ONE', get('key1')),
    );
    expect(mapper({})).toBe(undefined);
  });

});
