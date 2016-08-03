// vendor modules

import { get, isPlainObject, mapValues } from './utils';

// exports

export default function applyMapper(mapper, pojo) {
  if (typeof mapper === 'string') {
    return get(pojo, mapper);
  } else if (typeof mapper === 'function') {
    return mapper(pojo);
  } else if (isPlainObject(mapper)) {
    return mapValues(mapper, (nestedMapper) => applyMapper(nestedMapper, pojo));
  }
  throw new TypeError(`cannot apply mapper '${mapper}', need function|object|string`);
}
