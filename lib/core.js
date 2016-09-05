// modules

import { flow, get, isPlainObject, mapValues, omitByUndefined } from './utils';

// private functions

const applyMapper = (mapper) => (primitive) => {
  if (typeof mapper === 'string') {
    return get(primitive, mapper);
  } else if (typeof mapper === 'function') {
    return mapper(primitive);
  } else if (isPlainObject(mapper)) {
    return omitByUndefined(
      mapValues(
        mapper,
        (nestedMapper) => applyMapper(nestedMapper)(primitive)
      )
    );
  }
  throw new TypeError(`cannot apply mapper '${mapper}', need function|object|string`);
};

// exports

const mappr = (...mappers) => flow(mappers.map(applyMapper));

mappr.load = (pluginName, pluginLoader) => {
  if (mappr[pluginName]) {
    throw new Error(`mappr already has plugin occupying mappr.${pluginName}`);
  }
  mappr[pluginName] = pluginLoader(mappr);
};

export default mappr;
