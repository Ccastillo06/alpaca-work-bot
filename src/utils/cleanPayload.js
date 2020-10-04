export const cleanPayload = (payload) =>
  Object.keys(payload).reduce(
    (acc, next) =>
      typeof payload[next] === 'undefined'
        ? acc
        : {
            ...acc,
            [next]: payload[next]
          },
    {}
  )
