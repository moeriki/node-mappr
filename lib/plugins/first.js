// exports

export const first = (mappr) => (...mappers) => (pojo) => {
  for (const mapper of mappers) {
    const result = mappr(mapper)(pojo);
    if (result) {
      return result;
    }
  }
  return undefined;
};
