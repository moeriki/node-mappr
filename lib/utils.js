import get from 'lodash.get';
import isPlainObject from 'lodash.isplainobject';
import mapValues from 'lodash.mapvalues';
import omitBy from 'lodash.omitby';
import set from 'lodash.set';
import toPairs from 'lodash.topairs';

// exports

const castArray = (value) => Array.isArray(value) ? value : [value];

const flow = (...funcs) => (initialSource, ...additional) => funcs.reduce(
  (source, func) => func(source, ...additional),
  initialSource,
);

const omitByUndefined = (source) => omitBy(source, (value) => typeof value === 'undefined');

const or = (defaultValue) => (value) => value ? value : defaultValue;

const spreadKeys = (source) =>
  Object.keys(source).reduce((result, key) => {
    set(result, key, source[key]);
    return result;
  }, {})
;

export {
  castArray,
  flow,
  get,
  isPlainObject,
  mapValues,
  omitByUndefined,
  or,
  spreadKeys,
  toPairs,
};
