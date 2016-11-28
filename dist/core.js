'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

// private functions

var mapPOJO = (0, _utils.flow)(_utils.omitByUndefined, _utils.spreadKeys); // modules

var applyMapper = function applyMapper(mapper) {
  return function (source) {
    if (typeof mapper === 'string') {
      return (0, _utils.get)(source, mapper);
    } else if (typeof mapper === 'function') {
      return mapper(source);
    } else if ((0, _utils.isPlainObject)(mapper)) {
      return mapPOJO((0, _utils.mapValues)(mapper, function (nestedMapper) {
        return applyMapper(nestedMapper)(source);
      }));
    }
    throw new TypeError('cannot apply mapper \'' + mapper + '\', need function|object|string');
  };
};

// exports

var mappr = function mappr() {
  for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
    mappers[_key] = arguments[_key];
  }

  return (0, _utils.flow)(mappers.map(applyMapper));
};

mappr.load = function (pluginName, pluginLoader) {
  if (mappr[pluginName]) {
    throw new Error('mappr already has plugin occupying mappr.' + pluginName);
  }
  mappr[pluginName] = pluginLoader(mappr);
};

exports.default = mappr;