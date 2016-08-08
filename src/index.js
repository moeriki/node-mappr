// modules

import { flow, get, isPlainObject, mapValues } from './utils';

// private functions

const applyMapper = (mapper) => (primitive) => {
  if (typeof mapper === 'string') {
    return get(primitive, mapper);
  } else if (typeof mapper === 'function') {
    return mapper(primitive);
  } else if (isPlainObject(mapper)) {
    return mapValues(mapper, (nestedMapper) => applyMapper(nestedMapper)(primitive));
  }
  throw new TypeError(`cannot apply mapper '${mapper}', need function|object|string`);
};

// exports

const mappr = (...mappers) =>
  flow(mappers.map(applyMapper));

const compose = (...mappers) => (pojo) =>
  mappers.reduce(
    (result, mapper) => Object.assign(result, applyMapper(mapper)(pojo)),
    {}
  );

mappr.compose = compose;

export { mappr, compose };

export default mappr;
