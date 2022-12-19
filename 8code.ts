import input = require('./8input.json');
import { getNumVisibleTrees, getVisibleTreesInMatrix } from './8lib';

console.log(getVisibleTreesInMatrix(input).length);

const allLocations = Array.from(Array(input[0].length)).map((_, x) => {
  return Array.from(Array(input.length)).map((_, y) => ([x, y]));
}).flatMap(val => val);

console.log(allLocations.reduce((maxDistance, locations) => {
  const nums = getNumVisibleTrees(input, locations);

  return Math.max(maxDistance, nums[0] * nums[1] * nums[2] * nums[3]);
}, 0));
