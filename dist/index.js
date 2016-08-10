'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = undefined;

var _utils = require('./utils');

// private functions

var applyMapper = function applyMapper(mapper) {
  return function (primitive) {
    if (typeof mapper === 'string') {
      return (0, _utils.get)(primitive, mapper);
    } else if (typeof mapper === 'function') {
      return mapper(primitive);
    } else if ((0, _utils.isPlainObject)(mapper)) {
      return (0, _utils.mapValues)(mapper, function (nestedMapper) {
        return applyMapper(nestedMapper)(primitive);
      });
    }
    throw new TypeError('cannot apply mapper \'' + mapper + '\', need function|object|string');
  };
};

// exports

// modules

var mappr = function mappr() {
  for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
    mappers[_key] = arguments[_key];
  }

  return (0, _utils.flow)(mappers.map(applyMapper));
};

var compose = function compose() {
  for (var _len2 = arguments.length, mappers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    mappers[_key2] = arguments[_key2];
  }

  return function (pojo) {
    return mappers.reduce(function (result, mapper) {
      return Object.assign(result, applyMapper(mapper)(pojo));
    }, {});
  };
};

mappr.compose = compose;

exports.default = mappr;
exports.compose = compose;