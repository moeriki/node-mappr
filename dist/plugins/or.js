"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// exports

const or = exports.or = mappr => (...mappers) => pojo => {
  let result;
  for (const mapper of mappers) {
    result = mappr(mapper)(pojo);
    if (result) {
      return result;
    }
  }
  return result;
};