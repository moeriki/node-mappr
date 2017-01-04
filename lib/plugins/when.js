// private functions

const isFunction = (func) => typeof func === 'function';

const isDefaultCase = (func) => isFunction(func) && !func.INTERNAL_WHEN;

const isInternalWhen = (func) => isFunction(func) && func.INTERNAL_WHEN;

// exports

export const when = (mappr) => (mapper, ...cases) => {

  const internalWhen = (pojo) => {
    const condition = mappr(mapper)(pojo);

    if (cases.length > 2 || cases.some(isInternalWhen)) {
      // treat as switch case
      const defaultCase = cases.find(isDefaultCase);
      let match = null;

      cases
        .filter(isInternalWhen)
        .find((internalWhenCase) => (
          match = internalWhenCase(condition)
        ))
      ;

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
