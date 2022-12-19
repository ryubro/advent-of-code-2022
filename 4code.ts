import input = require('./4input.json');

export const isFullyOverlapped = (pair: string) => {
  const [a, b] = pair.split(',');

  const [aMin, aMax] = a.split('-').map(value => parseInt(value, 10));
  const [bMin, bMax] = b.split('-').map(value => parseInt(value, 10));

  if (aMin <= bMin && aMax >= bMax) {
    return true;
  }

  if (aMin >= bMin && aMax <= bMax) {
    return true;
  }

  return false;
};

export const isOverlapped = (pair: string) => {
  const [a, b] = pair.split(',');

  const [aMin, aMax] = a.split('-').map(value => parseInt(value, 10));
  const [bMin, bMax] = b.split('-').map(value => parseInt(value, 10));

  if (bMax < aMin || aMax < bMin) {
    return false;
  }

  return true;
};

console.log('fully overlapped', input.filter(isFullyOverlapped).length);
console.log('overlapped', input.filter(isOverlapped).length);
