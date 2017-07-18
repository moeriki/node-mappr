// exports

export const map = (mappr) => (...mappers) => (source, ...additional) =>
  source.map((listItem) =>
    mappr(...mappers)(listItem, ...additional)
  )
;
