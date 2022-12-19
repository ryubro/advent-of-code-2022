import { getEfficientFunctionalMonkey, getFunctionalMonkey, monkeyBusinessReducer, monkeyBusinessReducerWithoutWorryDividen, parseLines } from './11lib';

const input = [
'Monkey 0:',
'  Starting items: 79, 98',
'  Operation: new = old * 19',
'  Test: divisible by 23',
'    If true: throw to monkey 2',
'    If false: throw to monkey 3',
'',
'Monkey 1:',
'  Starting items: 54, 65, 75, 74',
'  Operation: new = old + 6',
'  Test: divisible by 19',
'    If true: throw to monkey 2',
'    If false: throw to monkey 0',
'',
'Monkey 2:',
'  Starting items: 79, 60, 97',
'  Operation: new = old * old',
'  Test: divisible by 13',
'    If true: throw to monkey 1',
'    If false: throw to monkey 3',
'',
'Monkey 3:',
'  Starting items: 74',
'  Operation: new = old + 3',
'  Test: divisible by 17',
'    If true: throw to monkey 0',
'    If false: throw to monkey 1',
];

describe('11 monkeyBusinessReducer', () => {
  it('works', () => {
    const monkeys = parseLines(input).map(getFunctionalMonkey);

    const monkeysAfter20Rounds = Array.from(Array(20)).reduce(monkeyBusinessReducer, monkeys);

    expect(monkeysAfter20Rounds.map(monkey => monkey.inspectionCount)).toEqual([101, 95, 7, 105]);
  });
});

describe('11 monkeyBusinessReducerWithoutDividens', () => {
  it('works', () => {
    const monkeys = parseLines(input).map(getEfficientFunctionalMonkey([ 23, 19, 13, 17 ]));

    const monkeysAfter20Rounds = Array.from(Array(10000)).reduce(monkeyBusinessReducerWithoutWorryDividen, monkeys);

    expect(monkeysAfter20Rounds.map(monkey => monkey.inspectionCount)).toEqual([52166, 47830, 1938, 52013]);
  });
});
