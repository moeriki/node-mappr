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

    return function (pojo) {
      return mappers.reduce(function (result, mapper) {
        return Object.assign(result, (0, _utils.omitByUndefined)(mappr(mapper)(pojo)));
      }, {});
    };
  };
}; // modules