'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.when = exports.match = undefined;

var _utils = require('../utils');

// constant

const MATCHER_PROPERTY = 'MAPPR_WHEN_MATCHER';

// private functions

// utils

const isDefaultMatcher = func => (0, _utils.isFunction)(func) && !func[MATCHER_PROPERTY];

const isMatcher = func => (0, _utils.isFunction)(func) && func[MATCHER_PROPERTY];

function ifWhen(cases, pojo, condition) {
  if (condition && cases[0]) {
    return cases[0](pojo);
  } else if (!condition && cases[1]) {
    return cases[1](pojo);
  }
  return undefined;
}

function switchWhen(cases, pojo, condition) {
  let matchResult;

  cases.filter(isMatcher).find(whenMatcher => matchResult = whenMatcher(condition, pojo));

  if (matchResult) {
    return matchResult;
  }

  const defaultMatch = cases.find(isDefaultMatcher);
  if (!defaultMatch) {
    return matchResult;
  }

  return defaultMatch(pojo);
}

// exports

const match = exports.match = () => (matcher, ...mappers) => {

  const internalMatch = (condition, pojo) => {
    const conditionResult = typeof matcher === 'function' ? matcher(condition) : matcher === condition;
    return conditionResult ? (0, _utils.flow)(...mappers)(pojo) : undefined;
  };

  internalMatch[MATCHER_PROPERTY] = true;

  return internalMatch;
};

const when = exports.when = mappr => (mapper, ...cases) => pojo => {

  const condition = mappr(mapper)(pojo);

  if (cases.some(isMatcher)) {
    // treat as switch statement
    return switchWhen(cases, pojo, condition);
  }

  // treat as if / else statement
  return ifWhen(cases, pojo, condition);
}; // end internalWhen