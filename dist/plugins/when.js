'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.when = exports.match = undefined;

var _utils = require('../utils');

// constant

var MATCHER_PROPERTY = 'MAPPR_WHEN_MATCHER';

// private

var isDefaultMatcher = function isDefaultMatcher(func) {
  return (0, _utils.isFunction)(func) && !func[MATCHER_PROPERTY];
};

var isMatcher = function isMatcher(func) {
  return (0, _utils.isFunction)(func) && func[MATCHER_PROPERTY];
};

function ifWhen(cases, pojo, condition) {
  if (condition && cases[0]) {
    return cases[0](pojo);
  } else if (!condition && cases[1]) {
    return cases[1](pojo);
  }
  return undefined;
}

function switchWhen(cases, pojo, condition) {
  var matchResult = void 0;

  cases.filter(isMatcher).find(function (whenMatcher) {
    return matchResult = whenMatcher(condition, pojo);
  });

  if (matchResult) {
    return matchResult;
  }

  var defaultMatch = cases.find(isDefaultMatcher);
  if (!defaultMatch) {
    return matchResult;
  }

  return defaultMatch(pojo);
}

// exports

var match = exports.match = function match() {
  return function (matcher) {
    for (var _len = arguments.length, mappers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      mappers[_key - 1] = arguments[_key];
    }

    var internalMatch = function internalMatch(condition, pojo) {
      var conditionResult = typeof matcher === 'function' ? matcher(condition) : matcher === condition;
      return conditionResult ? _utils.flow.apply(undefined, mappers)(pojo) : undefined;
    };

    internalMatch[MATCHER_PROPERTY] = true;

    return internalMatch;
  };
};

var when = exports.when = function when(mappr) {
  return function (mapper) {
    for (var _len2 = arguments.length, cases = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      cases[_key2 - 1] = arguments[_key2];
    }

    return function (pojo) {

      var condition = mappr(mapper)(pojo);

      if (cases.some(isMatcher)) {
        // treat as switch statement
        return switchWhen(cases, pojo, condition);
      }

      // treat as if / else statement
      return ifWhen(cases, pojo, condition);
    };
  };
}; // end internalWhen