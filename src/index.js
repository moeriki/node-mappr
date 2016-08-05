// modules

import { flow, get, isPlainObject, mapValues } from './utils';

// private functions

const applyMapper = (mapper) => (pojo) => {
  if (typeof mapper === 'string') {
    return get(pojo, mapper);
  } else if (typeof mapper === 'function') {
    return mapper(pojo);
  } else if (isPlainObject(mapper)) {
    return mapValues(mapper, (nestedMapper) => applyMapper(nestedMapper)(pojo));
  }
  throw new TypeError(`cannot apply mapper '${mapper}', need function|object|string`);
};

// exports

export const createMapper = (mapper, ...formatters) => {
  if (formatters.length === 0) {
    return applyMapper(mapper);
  }
  return flow(
    applyMapper(mapper),
    ...formatters,
  );
};

export const composeMappers = (...mappers) => (pojo) =>
  mappers.reduce(
    (result, mapper) => Object.assign(result, applyMapper(mapper)(pojo)),
    {}
  );
