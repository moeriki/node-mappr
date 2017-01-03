// modules

import get from 'lodash.get';
import isPlainObject from 'lodash.isplainobject';
import mapValues from 'lodash.mapvalues';
import omitBy from 'lodash.omitby';
import set from 'lodash.set';
import toPairs from 'lodash.topairs';

// exports

const flow = (...funcs) => (initialValue) => funcs.reduce((value, func) => func(value), initialValue);

const omitByUndefined = (source) => omitBy(source, (value) => typeof value === 'undefined');

const spreadKeys = (pojo) =>
  Object.keys(pojo).reduce((result, key) => {
    set(result, key, pojo[key]);
    return result;
  }, {})
;

export {
  flow,
  get,
  isPlainObject,
  mapValues,
  omitByUndefined,
  spreadKeys,
  toPairs,
};
