// private functions

const only = (expectedCondition) => (mappr) => (...mappers) => {
  const condition = mappers.shift();

  const conditionChecker = typeof condition === 'function'
    ? condition
    : () => condition;

  const conditionalMapper = mappr(...mappers);

  return (pojo) => Boolean(conditionChecker(pojo)) === expectedCondition
    ? conditionalMapper(pojo)
    : undefined;
};

// exports

export const onlyIf = only(true);

export const onlyUnless = only(false);
