'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyMapper;

var _utils = require('./utils');

// exports

function applyMapper(mapper, pojo) {
  if (typeof mapper === 'string') {
    return (0, _utils.get)(pojo, mapper);
  } else if (typeof mapper === 'function') {
    return mapper(pojo);
  } else if ((0, _utils.isPlainObject)(mapper)) {
    return (0, _utils.mapValues)(mapper, function (nestedMapper) {
      return applyMapper(nestedMapper, pojo);
    });
  }
  throw new TypeError('cannot apply mapper \'' + mapper + '\', need function|object|string');
} // vendor modules