import { omitByUndefined } from '../utils';

// exports

export const compose = (mappr) => (...mappers) => (source) =>
  mappers.reduce(
    (result, mapper) => Object.assign(
      result,
      omitByUndefined(
        mappr(mapper)(source)
      )
    ),
    {}
  )
;
