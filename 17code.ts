import input = require('./17input.json');
import { type Cell, type Direction, rockReducer, rocksGenerator, trim, byPattern } from "./17lib";
import { reduce } from "./utils/generator";

const directionGenerator = function*() {
  while (true) {
    yield* Array.from(input) as Direction[];
  }
};

const theFunc = (num: number) => reduce(
  rocksGenerator(num),
  rockReducer(directionGenerator()),
  [['#', '#', '#', '#', '#', '#', '#']] as Cell[][],
);

const chamber = reduce(rocksGenerator(2022),
  rockReducer(directionGenerator()),
  [['#', '#', '#', '#', '#', '#', '#']] as Cell[][],
);

// console.log(trim(theFunc(2022)).length - 1);

// console.log(trim(theFunc(2134)).length - 1);
// console.log(trim(theFunc(3839)).length - 1);
// console.log(trim(theFunc(5544)).length - 1);
console.log(byPattern(3839, 1705)(input as Iterable<Direction>, 1000000000000));
