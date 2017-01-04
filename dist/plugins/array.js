'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.array = undefined;

var _utils = require('../utils');

// exports

var array = exports.array = function array(mappr) {
  return function () {
    for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
      mappers[_key] = arguments[_key];
    }

    return mappr.apply(undefined, [mappers.splice(0, 1)[0], (0, _utils.or)([]), _utils.castArray].concat(mappers, [function (results) {
      return !results || results.length === 0 ? undefined : results;
    }]));
  };
}; // modules