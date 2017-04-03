import { omitByUndefined } from '../utils';

// exports

export const compose = (mappr) => (...mappers) => (pojo) =>
  mappers.reduce(
    (result, mapper) => Object.assign(
      result,
      omitByUndefined(
        mappr(mapper)(pojo)
      )
    ),
    {}
  )
;
