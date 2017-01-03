// modules

import { flow, get, isPlainObject, mapValues, omitByUndefined, spreadKeys } from './utils';

// private functions

const mapPOJO = flow(omitByUndefined, spreadKeys);

const applyMapper = (mapper) => (source) => {
  if (typeof mapper === 'string') {
    return get(source, mapper);
  } else if (typeof mapper === 'function') {
    return mapper(source);
  } else if (isPlainObject(mapper)) {
    return mapPOJO(
      mapValues(
        mapper,
        (nestedMapper) => applyMapper(nestedMapper)(source)
      )
    );
  }
  throw new TypeError(`cannot apply mapper '${mapper}', need function|object|string, is ${typeof mapper}`);
};

// exports

const mappr = (...mappers) => flow(...mappers.map(applyMapper));

mappr.load = (pluginName, pluginLoader) => {
  if (mappr[pluginName]) {
    throw new Error(`mappr already has plugin occupying mappr.${pluginName}`);
  }
  mappr[pluginName] = pluginLoader(mappr);
};

export default mappr;
