'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

// private functions

const mapPOJO = (0, _utils.flow)(_utils.omitByUndefined, _utils.spreadKeys); // modules

const applyMapper = mapper => source => {
  if (typeof mapper === 'string') {
    return (0, _utils.get)(source, mapper);
  } else if (typeof mapper === 'function') {
    return mapper(source);
  } else if ((0, _utils.isPlainObject)(mapper)) {
    return mapPOJO((0, _utils.mapValues)(mapper, nestedMapper => applyMapper(nestedMapper)(source)));
  }
  throw new TypeError(`cannot apply mapper '${mapper}', need function|object|string, is ${typeof mapper}`);
};

// exports

const mappr = (...mappers) => (0, _utils.flow)(...mappers.map(applyMapper));

mappr.load = (pluginName, pluginLoader) => {
  if (mappr[pluginName]) {
    throw new Error(`mappr already has plugin occupying mappr.${pluginName}`);
  }
  mappr[pluginName] = pluginLoader(mappr);
};

exports.default = mappr;