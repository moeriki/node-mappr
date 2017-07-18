import { omitByUndefined } from '../utils';

// exports

export const compose = (mappr) => (...mappers) => (...sources) =>
  mappers.reduce(
    (result, mapper) => Object.assign(
      result,
      omitByUndefined(
        mappr(mapper)(...sources)
      )
    ),
    {}
  )
;
