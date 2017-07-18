// exports

export const or = (mappr) => (...mappers) => (...sources) => {
  let result;
  for (const mapper of mappers) {
    result = mappr(mapper)(...sources);
    if (result) {
      return result;
    }
  }
  return result;
};
