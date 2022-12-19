import input = require('./9input.json');
import { getTailPositionHistory, dirNumToDirs, get9thTailHistory } from './9lib';

const directions = input.map(dirNumToDirs).flatMap(val => val);

console.log(getTailPositionHistory(directions).length);
console.log(get9thTailHistory(directions).length);
