'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = undefined;

var _utils = require('../utils');

// exports

var compose = exports.compose = function compose(mappr) {
  return function () {
    for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
      mappers[_key] = arguments[_key];
    }

    return function () {
      for (var _len2 = arguments.length, sources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        sources[_key2] = arguments[_key2];
      }

      return mappers.reduce(function (result, mapper) {
        return Object.assign(result, (0, _utils.omitByUndefined)(mappr(mapper).apply(undefined, sources)));
      }, {});
    };
  };
};