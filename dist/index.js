'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeMappers = exports.createMapper = exports.applyMapper = undefined;

var _applyMapper = require('./apply-mapper');

var _applyMapper2 = _interopRequireDefault(_applyMapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// exports

exports.applyMapper = _applyMapper2.default; // modules

var createMapper = exports.createMapper = function createMapper(mapper) {
  return function (pojo) {
    return (0, _applyMapper2.default)(mapper, pojo);
  };
};

var composeMappers = exports.composeMappers = function composeMappers() {
  for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
    mappers[_key] = arguments[_key];
  }

  return function (pojo) {
    return mappers.reduce(function (result, mapper) {
      return Object.assign(result, (0, _applyMapper2.default)(mapper, pojo));
    }, {});
  };
};