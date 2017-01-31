'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.array = undefined;

var _utils = require('../utils');

// exports

const array = exports.array = mappr => (...mappers) => mappr(mappers.splice(0, 1)[0], (0, _utils.or)([]), _utils.castArray, ...mappers, results => !results || results.length === 0 ? undefined : results); // modules