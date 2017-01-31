// exports

export const or = (mappr) => (...mappers) => (pojo) => {
  let result;
  for (const mapper of mappers) {
    result = mappr(mapper)(pojo);
    if (result) {
      return result;
    }
  }
  return result;
};
