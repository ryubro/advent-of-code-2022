import input = require('./12input.json');
import { func, func1, inputToMap } from './12lib';

const { map, start, dest } = inputToMap(input);

let explored = [];

console.log(func(map, explored, dest, start));

let explored1 = []

console.log(func1(map, explored1, start, dest ));
