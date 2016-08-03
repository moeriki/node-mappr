// modules

import applyMapper from './apply-mapper';

// exports

export { applyMapper };

export const createMapper = (mapper) => (pojo) =>
  applyMapper(mapper, pojo);

export const composeMappers = (...mappers) => (pojo) =>
  mappers.reduce(
    (result, mapper) => Object.assign(result, applyMapper(mapper, pojo)),
    {}
  );
