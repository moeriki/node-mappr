'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// private functions

var isFunction = function isFunction(func) {
  return typeof func === 'function';
};

var isDefaultCase = function isDefaultCase(func) {
  return isFunction(func) && !func.INTERNAL_WHEN;
};

var isInternalWhen = function isInternalWhen(func) {
  return isFunction(func) && func.INTERNAL_WHEN;
};

// exports

var when = exports.when = function when(mappr) {
  return function (mapper) {
    for (var _len = arguments.length, cases = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      cases[_key - 1] = arguments[_key];
    }

    var internalWhen = function internalWhen(pojo) {
      var condition = mappr(mapper)(pojo);

      if (cases.length > 2 || cases.some(isInternalWhen)) {
        // treat as switch case
        var defaultCase = cases.find(isDefaultCase);
        var match = null;

        cases.filter(isInternalWhen).find(function (internalWhenCase) {
          return match = internalWhenCase(condition);
        });

        if (!match && defaultCase) {
          match = defaultCase(condition);
        }

        return match;
      }

      // treat as if / else statement
      if (condition && cases[0]) {
        return cases[0](condition);
      } else if (!condition && cases[1]) {
        return cases[1](condition);
      }

      return undefined;
    }; // end internalWhen

    internalWhen.INTERNAL_WHEN = true;

    return internalWhen;
  };
};