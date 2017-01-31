"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// exports

var or = exports.or = function or(mappr) {
  return function () {
    for (var _len = arguments.length, mappers = Array(_len), _key = 0; _key < _len; _key++) {
      mappers[_key] = arguments[_key];
    }

    return function (pojo) {
      var result = void 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = mappers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var mapper = _step.value;

          result = mappr(mapper)(pojo);
          if (result) {
            return result;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return result;
    };
  };
};