'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // modules

var _utils = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// private functions

var mapPOJO = (0, _utils.flow)(_utils.omitByUndefined, _utils.spreadKeys);

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
    throw new TypeError('cannot apply mapper \'' + mapper + '\', need function|object|string, is ' + (typeof mapper === 'undefined' ? 'undefined' : _typeof(mapper)));
  };
};

// exports

var mappr = function mappr() {
  for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
    mappers[_key] = arguments[_key];
  }

  return _utils.flow.apply(undefined, _toConsumableArray(mappers.map(applyMapper)));
};

mappr.load = function (pluginName, pluginLoader) {
  if (mappr[pluginName]) {
    throw new Error('mappr already has plugin occupying mappr.' + pluginName);
  }
  mappr[pluginName] = pluginLoader(mappr);
};

exports.default = mappr;