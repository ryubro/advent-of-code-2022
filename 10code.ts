import input = require('./10input.json');
import { instructionReducer, renderScreen } from './10lib';

const cycles = input.reduce(instructionReducer, [1]);

console.log(cycles[19] * 20 + cycles[59] * 60 + cycles[99] * 100 + cycles[139] * 140 + cycles[179] * 180 + cycles[219] * 220);

console.log(renderScreen(cycles));
