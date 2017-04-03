import { castArray, or } from '../utils';

// exports

export const array = (mappr) => (...mappers) => mappr(
  mappers.splice(0, 1)[0],
  or([]),
  castArray,
  ...mappers,
  (results) => !results || results.length === 0 ? undefined : results,
);
