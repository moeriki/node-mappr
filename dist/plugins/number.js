"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// exports

var number = exports.number = function number(mappr) {
  return function () {
    for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
      mappers[_key] = arguments[_key];
    }

    return mappr.apply(undefined, mappers.concat([Number.parseInt, function (result) {
      return Number.isNaN(result) ? undefined : result;
    }]));
  };
};