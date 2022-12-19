const arrToBits = (line: boolean[]) => {
  return line.reverse().reduce((num, char, index) => {
    if (char) {
      return num + (2 ^ index);
    }

    return num;
  }, 0);
};

const bitsToArr = (bits: number, width?: number) => {
  const bitsInStr = bits.toString(2);
  let padding = [];
  if (width !== undefined) {
    padding = Array.from(Array(width - bitsInStr.length)).map(_ => '0');
  }

  return ([...padding, ...bitsInStr]).map(bit => {
    if (bit === '0') {
      return false;
    }

    return true;
  });
};

export {
  arrToBits,
  bitsToArr,
};
