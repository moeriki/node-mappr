'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = undefined;

var _utils = require('../utils');

// exports

const compose = exports.compose = mappr => (...mappers) => pojo => mappers.reduce((result, mapper) => Object.assign(result, (0, _utils.omitByUndefined)(mappr(mapper)(pojo))), {}); // modules