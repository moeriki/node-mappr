// modules

import { flow, get, isPlainObject, mapValues } from './utils';

// exports

export const createMapper = (mapper) => (pojo) => {
  if (typeof mapper === 'string') {
    return get(pojo, mapper);
  } else if (typeof mapper === 'function') {
    return mapper(pojo);
  } else if (isPlainObject(mapper)) {
    return mapValues(mapper, (nestedMapper) => createMapper(nestedMapper)(pojo));
  }
  throw new TypeError(`cannot apply mapper '${mapper}', need function|object|string`);
};

export const composeMappers = (...mappers) => (pojo) =>
  mappers.reduce(
    (result, mapper) => Object.assign(result, createMapper(mapper)(pojo)),
    {}
  );

export const format = (mapper, ...formatters) => flow(
  createMapper(mapper),
  ...formatters,
);
