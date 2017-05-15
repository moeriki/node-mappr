// exports

export const or = (mappr) => (...mappers) => (source) => {
  let result;
  for (const mapper of mappers) {
    result = mappr(mapper)(source);
    if (result) {
      return result;
    }
  }
  return result;
};
