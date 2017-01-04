// private functions

const isFunction = (func) => typeof func === 'function';

const isDefaultCase = (func) => isFunction(func) && !func.INTERNAL_WHEN;

const isInternalWhen = (func) => isFunction(func) && func.INTERNAL_WHEN;

// exports

export const when = (mappr) => (mapper, ...cases) => {

  const internalWhen = (pojo, parentCondition) => {
    let currentMapper = mapper;
    if (parentCondition && typeof mapper !== 'function') {
      currentMapper = (value) => parentCondition === value;
    }

    const condition = mappr(currentMapper)(parentCondition || pojo);

    if (cases.some(isInternalWhen)) {
      // treat as switch case
      let match;

      cases
        .filter(isInternalWhen)
        .find((internalWhenCase) => {
          match = internalWhenCase(pojo, condition);
          return match;
        })
      ;

      if (match) {
        return match;
      }

      const defaultCase = cases.find(isDefaultCase);
      if (!defaultCase) {
        return match;
      }

      return defaultCase(pojo);
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
