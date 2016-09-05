'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// private functions

var only = function only(expectedCondition) {
  return function (mappr) {
    return function () {
      for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
        mappers[_key] = arguments[_key];
      }

      var condition = mappers.shift();

      var conditionChecker = typeof condition === 'function' ? condition : function () {
        return condition;
      };

      var conditionalMapper = mappr.apply(undefined, mappers);

      return function (pojo) {
        return Boolean(conditionChecker(pojo)) === expectedCondition ? conditionalMapper(pojo) : undefined;
      };
    };
  };
};

// exports

var onlyIf = exports.onlyIf = only(true);

var onlyUnless = exports.onlyUnless = only(false);