import input = require('./6input.json');
import { indexOfStartOfMessage, indexOfStartOfPacket } from './6lib';

console.log('start of packet', indexOfStartOfPacket(input));
console.log('start of message', indexOfStartOfMessage(input));
