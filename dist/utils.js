'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPairs = exports.spreadKeys = exports.or = exports.omitByUndefined = exports.mapValues = exports.isPlainObject = exports.isFunction = exports.get = exports.flow = exports.castArray = undefined;

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

const castArray = value => Array.isArray(value) ? value : [value];

const flow = (...funcs) => initialValue => funcs.reduce((value, func) => func(value), initialValue);

const isFunction = func => typeof func === 'function';

const omitByUndefined = source => (0, _lodash8.default)(source, value => typeof value === 'undefined');

const or = defaultValue => value => value ? value : defaultValue;

const spreadKeys = pojo => Object.keys(pojo).reduce((result, key) => {
  (0, _lodash10.default)(result, key, pojo[key]);
  return result;
}, {});

exports.castArray = castArray;
exports.flow = flow;
exports.get = _lodash2.default;
exports.isFunction = isFunction;
exports.isPlainObject = _lodash4.default;
exports.mapValues = _lodash6.default;
exports.omitByUndefined = omitByUndefined;
exports.or = or;
exports.spreadKeys = spreadKeys;
exports.toPairs = _lodash12.default;