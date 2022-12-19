import input = require('./7input.json');
import { mapPathToSize } from './7lib';

const pathToSize = mapPathToSize(input);

console.log(Object.entries(pathToSize).filter(([key,]) => key.endsWith('/')).filter(([,value]) => value <= 100000).reduce((sum, [, value]) => sum + value, 0));

const leastAmountToDelete = pathToSize['/'] - 40000000;


console.log({ totalUsed: pathToSize['/'], leastAmountToDelete });
console.log(Object.entries(pathToSize).filter(([key,]) => key.endsWith('/')).filter(([,value]) => value >= leastAmountToDelete).sort((a, b) => a[1] - b[1]));

