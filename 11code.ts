import input = require('./11input.json');
import { parseLines, monkeyBusinessReducer, getFunctionalMonkey, monkeyBusinessReducerWithoutWorryDividen, getEfficientFunctionalMonkey } from './11lib';

const monkeys = parseLines(input);
const functionalMonkeys = monkeys.map(getFunctionalMonkey);

console.log({ sum: functionalMonkeys.reduce((sum, monkey) => sum + monkey.items.length, 0) });

const numInspections = Array.from(Array(20))
  .reduce(monkeyBusinessReducer, functionalMonkeys)
  .map(monkey => {
    // console.log(JSON.stringify(monkey, null, 2));
    console.log(monkey.items.length);
    return monkey;
  })
  .map(monkey => monkey.inspectionCount);

console.log(numInspections.sort((a, b) => b - a).slice(0, 2).reduce((result, num) => result * num, 1));

const efficientFunctionalMonkeys = parseLines(input).map(getEfficientFunctionalMonkey([2, 3, 5, 7, 11, 13, 17, 19]));

console.log({ sum: efficientFunctionalMonkeys.reduce((sum, monkey) => sum + monkey.items.length, 0) });

const numInspectionsWithoutDividing = Array.from(Array(10000))
  .reduce(monkeyBusinessReducerWithoutWorryDividen, efficientFunctionalMonkeys)
  .map(monkey => {
    // console.log(JSON.stringify(monkey, null, 2));
    console.log(monkey.items.length);
    return monkey;
  })
  .map(monkey => monkey.inspectionCount);

console.log(numInspectionsWithoutDividing.sort((a, b) => b - a).slice(0, 2).reduce((result, num) => result * num, 1));
