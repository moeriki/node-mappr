'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// private

var mapSource = (0, _utils.flow)(_utils.omitByUndefined, _utils.spreadKeys);

var applyMapper = function applyMapper(mapper, destinationKey) {
  return function () {
    for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
      sources[_key] = arguments[_key];
    }

    if (mapper === true || mapper === 1) {
      return (0, _utils.get)(sources[0], destinationKey);
    } else if (typeof mapper === 'string') {
      return (0, _utils.get)(sources[0], mapper);
    } else if (typeof mapper === 'function') {
      return mapper.apply(undefined, sources);
    } else if ((0, _utils.isPlainObject)(mapper)) {
      return mapSource((0, _utils.mapValues)(mapper, function (nestedMapper, nestedDestinationKey) {
        return applyMapper(nestedMapper, nestedDestinationKey).apply(undefined, sources);
      }));
    }
    throw new TypeError(`cannot apply mapper '${mapper}', need function|object|string, is ${typeof mapper}`);
  };
};

// exports

var mappr = function mappr() {
  for (var _len2 = arguments.length, mappers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    mappers[_key2] = arguments[_key2];
  }

  return _utils.flow.apply(undefined, _toConsumableArray(mappers.map(applyMapper)));
};

mappr.load = function (pluginName, pluginLoader) {
  if (mappr[pluginName]) {
    throw new Error(`mappr already has plugin occupying mappr.${pluginName}`);
  }
  mappr[pluginName] = pluginLoader(mappr);
};

exports.default = mappr;