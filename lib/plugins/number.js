// exports

export const number = (mappr) => (...mappers) => mappr(
  ...mappers,
  Number.parseInt,
);
