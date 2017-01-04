'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

    var internalWhen = function internalWhen(pojo, parentCondition) {
      var currentMapper = mapper;
      if (parentCondition && typeof mapper !== 'function') {
        currentMapper = function currentMapper(value) {
          return parentCondition === value;
        };
      }

      var condition = mappr(currentMapper)(parentCondition || pojo);

      if (cases.some(isInternalWhen)) {
        var _ret = function () {
          // treat as switch case
          var match = void 0;

          cases.filter(isInternalWhen).find(function (internalWhenCase) {
            match = internalWhenCase(pojo, condition);
            return match;
          });

          if (match) {
            return {
              v: match
            };
          }

          var defaultCase = cases.find(isDefaultCase);
          if (!defaultCase) {
            return {
              v: match
            };
          }

          return {
            v: defaultCase(pojo)
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      // treat as if / else statement
      if (condition && cases[0]) {
        return cases[0](pojo);
      } else if (!condition && cases[1]) {
        return cases[1](pojo);
      }

      return undefined;
    }; // end internalWhen

    internalWhen.INTERNAL_WHEN = true;

    return internalWhen;
  };
};