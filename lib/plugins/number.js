// exports

export const number = (mappr) => (...mappers) => mappr( // eslint-disable-line id-blacklist
  ...mappers,
  Number.parseInt,
);
