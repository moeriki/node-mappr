import { flow, get, isPlainObject, mapValues, omitByUndefined, spreadKeys } from './utils';

// private

const mapSource = flow(omitByUndefined, spreadKeys);

const applyMapper = (mapper) => (...sources) => {
  if (typeof mapper === 'string') {
    return get(sources[0], mapper);
  } else if (typeof mapper === 'function') {
    return mapper(...sources);
  } else if (isPlainObject(mapper)) {
    return mapSource(
      mapValues(
        mapper,
        (nestedMapper) => applyMapper(nestedMapper)(...sources)
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
