const reduce = <T, Acc>(it: Iterable<T>, cb: (acc: Acc, val: T) => Acc, initial: Acc) => {
  let acc = initial;
  for (const val of it) {
    acc = cb(acc, val);
  }

  return acc;
};

export { reduce };
