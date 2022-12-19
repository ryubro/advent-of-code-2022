const createIndexOfUniqSequence = (num: number) => (input: string) => {
  const arr = Array.from(input);

  let buffer: string[] = []

  const index = arr.findIndex((char) => {
    buffer = [char, ...buffer];

    if (buffer.length === num + 1) {
      buffer.pop();
    }

    if (buffer.length !== num) {
      return false;
    }

    const { hasDup } = buffer.reduce(({ arr, hasDup }, thisChar) => {
      if (hasDup) {
        return { arr, hasDup };
      }

      if (arr.includes(thisChar)) {
        return { arr, hasDup: true };
      }

      return { arr: [ ...arr, thisChar ], hasDup };
    }, { arr: [], hasDup: false });

    return !hasDup;
  });

  return index + 1;
};

const indexOfStartOfPacket = createIndexOfUniqSequence(4);

const indexOfStartOfMessage = createIndexOfUniqSequence(14);

export { indexOfStartOfPacket, indexOfStartOfMessage };
