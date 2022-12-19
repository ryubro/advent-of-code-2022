import input = require('./5input.json');
import { handleInput, handleInputBy9001 } from './5lib';

console.log(handleInput(input).map(stack => stack[0]).join(''));

console.log(handleInputBy9001(input).map(stack => stack[0]).join(''));
