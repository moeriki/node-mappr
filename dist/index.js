'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeMappers = exports.createMapper = undefined;

var _utils = require('./utils');

// private functions

var applyMapper = function applyMapper(mapper) {
  return function (pojo) {
    if (typeof mapper === 'string') {
      return (0, _utils.get)(pojo, mapper);
    } else if (typeof mapper === 'function') {
      return mapper(pojo);
    } else if ((0, _utils.isPlainObject)(mapper)) {
      return (0, _utils.mapValues)(mapper, function (nestedMapper) {
        return applyMapper(nestedMapper)(pojo);
      });
    }
    throw new TypeError('cannot apply mapper \'' + mapper + '\', need function|object|string');
  };
};

// exports

// modules

var createMapper = exports.createMapper = function createMapper(mapper) {
  for (var _len = arguments.length, formatters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    formatters[_key - 1] = arguments[_key];
  }

  if (formatters.length === 0) {
    return applyMapper(mapper);
  }
  return _utils.flow.apply(undefined, [applyMapper(mapper)].concat(formatters));
};

var composeMappers = exports.composeMappers = function composeMappers() {
  for (var _len2 = arguments.length, mappers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    mappers[_key2] = arguments[_key2];
  }

  return function (pojo) {
    return mappers.reduce(function (result, mapper) {
      return Object.assign(result, applyMapper(mapper)(pojo));
    }, {});
  };
};