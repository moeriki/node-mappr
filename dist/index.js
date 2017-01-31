'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _plugins = require('./plugins');

var plugins = _interopRequireWildcard(_plugins);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load plugins

for (const [pluginName, plugin] of (0, _utils.toPairs)(plugins)) {
  _core2.default.load(pluginName, plugin);
}

// exports

// modules

exports.default = _core2.default;