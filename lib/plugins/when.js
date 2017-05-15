import { flow, isFunction } from '../utils';

// constant

const MATCHER_PROPERTY = 'MAPPR_WHEN_MATCHER';

// private

const isDefaultMatcher = (func) => isFunction(func) && !func[MATCHER_PROPERTY];

const isMatcher = (func) => isFunction(func) && func[MATCHER_PROPERTY];

function ifWhen(cases, source, condition) {
  if (condition && cases[0]) {
    return cases[0](source);
  } else if (!condition && cases[1]) {
    return cases[1](source);
  }
  return undefined;
}

function switchWhen(cases, source, condition) {
  let matchResult;

  cases
    .filter(isMatcher)
    .find((whenMatcher) => {
      matchResult = whenMatcher(condition, source);
      return matchResult !== undefined;
    })
  ;

  if (matchResult !== undefined) {
    return matchResult;
  }

  const defaultMatch = cases.find(isDefaultMatcher);
  if (!defaultMatch) {
    return matchResult;
  }

  return defaultMatch(source);
}

// exports

export const match = () => (matcher, ...mappers) => {

  const internalMatch = (condition, source) => {
    const conditionResult = typeof matcher === 'function'
      ? matcher(condition)
      : matcher === condition
    ;
    return conditionResult ? flow(...mappers)(source) : undefined;
  };

  internalMatch[MATCHER_PROPERTY] = true;

  return internalMatch;
};

export const when = (mappr) => (mapper, ...cases) => (source) => {

  const condition = mappr(mapper)(source);

  if (cases.some(isMatcher)) {
    // treat as switch statement
    return switchWhen(cases, source, condition);
  }

  // treat as if / else statement
  return ifWhen(cases, source, condition);
}; // end internalWhen
