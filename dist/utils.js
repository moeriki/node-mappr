'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPairs = exports.spreadKeys = exports.or = exports.omitByUndefined = exports.mapValues = exports.isPlainObject = exports.get = exports.flow = exports.castArray = undefined;

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isplainobject');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.mapvalues');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.omitby');

var _lodash8 = _interopRequireDefault(_lodash7);

var _lodash9 = require('lodash.set');

var _lodash10 = _interopRequireDefault(_lodash9);

var _lodash11 = require('lodash.topairs');

var _lodash12 = _interopRequireDefault(_lodash11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// exports

// modules

var castArray = function castArray(value) {
  return Array.isArray(value) ? value : [value];
};

var flow = function flow() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function (initialValue) {
    return funcs.reduce(function (value, func) {
      return func(value);
    }, initialValue);
  };
};

var omitByUndefined = function omitByUndefined(source) {
  return (0, _lodash8.default)(source, function (value) {
    return typeof value === 'undefined';
  });
};

var or = function or(defaultValue) {
  return function (value) {
    return value ? value : defaultValue;
  };
};

var spreadKeys = function spreadKeys(pojo) {
  return Object.keys(pojo).reduce(function (result, key) {
    (0, _lodash10.default)(result, key, pojo[key]);
    return result;
  }, {});
};

exports.castArray = castArray;
exports.flow = flow;
exports.get = _lodash2.default;
exports.isPlainObject = _lodash4.default;
exports.mapValues = _lodash6.default;
exports.omitByUndefined = omitByUndefined;
exports.or = or;
exports.spreadKeys = spreadKeys;
exports.toPairs = _lodash12.default;