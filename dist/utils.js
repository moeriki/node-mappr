'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPairs = exports.spreadKeys = exports.omitByUndefined = exports.mapValues = exports.isPlainObject = exports.get = exports.flow = undefined;

var _lodash = require('lodash.flow');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.get');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.isplainobject');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.mapvalues');

var _lodash8 = _interopRequireDefault(_lodash7);

var _lodash9 = require('lodash.omitby');

var _lodash10 = _interopRequireDefault(_lodash9);

var _lodash11 = require('lodash.set');

var _lodash12 = _interopRequireDefault(_lodash11);

var _lodash13 = require('lodash.topairs');

var _lodash14 = _interopRequireDefault(_lodash13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var omitByUndefined = function omitByUndefined(source) {
  return (0, _lodash10.default)(source, function (value) {
    return typeof value === 'undefined';
  });
};

var spreadKeys = function spreadKeys(pojo) {
  return Object.keys(pojo).reduce(function (result, key) {
    (0, _lodash12.default)(result, key, pojo[key]);
    return result;
  }, {});
};

exports.flow = _lodash2.default;
exports.get = _lodash4.default;
exports.isPlainObject = _lodash6.default;
exports.mapValues = _lodash8.default;
exports.omitByUndefined = omitByUndefined;
exports.spreadKeys = spreadKeys;
exports.toPairs = _lodash14.default;