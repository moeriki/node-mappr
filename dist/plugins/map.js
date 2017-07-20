"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// exports

var map = exports.map = function map(mappr) {
  return function () {
    for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
      mappers[_key] = arguments[_key];
    }

    return function (source) {
      for (var _len2 = arguments.length, additional = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        additional[_key2 - 1] = arguments[_key2];
      }

      return source.map(function (listItem) {
        return mappr.apply(undefined, mappers).apply(undefined, [listItem].concat(additional));
      });
    };
  };
};