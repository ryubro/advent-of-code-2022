import { last } from 'lodash';

type Monkey = {
  id: string;
  items: number[];
  op: string;
  divisibleBy: number;
  whenTrue: string;
  whenFalse: string;
};

type functionalMonkey = Pick<Monkey, 'id' | 'items'> & {
  op: (old: number) => number;
  getDest: (item: number) => string;
};

type FunctionalMonkeyWithBusinessRecord = functionalMonkey & {
  inspectionCount?: number;
};

type MeasuringOrientedItem = Array<{ divider: number, remainder: number }>;

type EfficientFunctionalMonkeyWithBusinessRecord = Omit<FunctionalMonkeyWithBusinessRecord, 'items' | 'getDest'> & {
  items: MeasuringOrientedItem[],
  getDest: (item: MeasuringOrientedItem) => string;
};

const parseLines = (lines: string[]) => {
  const groups = lines.reduce((_groups, line) => {
    if (line === '') {
      return [..._groups, []];
    }

    const lastGroup = last(_groups);
    return [..._groups.slice(0, -1), [...lastGroup, line]];
  }, [[]] as string[][]);

  const monkeys = groups.map(group => {
    return group.reduce(parseMonkey, {} as Monkey);
  });

  return monkeys;
};

const parseMonkey = (monkey: Monkey, line: string): Monkey => {
  const idMatch = line.match(/Monkey (\d+):/);
  if (idMatch) {
    return { ...monkey, id: idMatch[1] };
  }

  const itemMatch = line.match(/Starting items: ([\d, ]+)/);
  if (itemMatch) {
    return { ...monkey, items: itemMatch[1].split(', ').map(val => parseInt(val)) };
  }

  const opMatch = line.match(/Operation: (.+)/);
  if (opMatch) {
    return { ...monkey, op: opMatch[1] };
  }

  const divisibleByMatch = line.match(/Test: divisible by (\d+)/);
  if (divisibleByMatch) {
    return { ...monkey, divisibleBy: parseInt(divisibleByMatch[1]) };
  }

  const whenTrueMatch = line.match(/If true: throw to monkey (\d+)/);
  if (whenTrueMatch) {
    return { ...monkey, whenTrue: whenTrueMatch[1] };
  }

  const whenFalseMatch = line.match(/If false: throw to monkey (\d+)/);
  if (whenFalseMatch) {
    return { ...monkey, whenFalse: whenFalseMatch[1] };
  }
}

const getFunctionalMonkey = (monkey: Monkey): functionalMonkey => {
  const op = eval(`(old) => { let new; ${monkey.op}; return new; }`.replaceAll('new', 'mau'));
  const getDest = eval(`(item) => { return item % ${monkey.divisibleBy} === 0 ? '${monkey.whenTrue}' : '${monkey.whenFalse}' }`);

  const { id, items } = monkey;

  return { id, items, op, getDest };
};

const getEfficientFunctionalMonkey = (dividers: number[]) => (monkey: Monkey): EfficientFunctionalMonkeyWithBusinessRecord => {
  const op = eval(`(old) => { let new; ${monkey.op}; return new; }`.replaceAll('new', 'mau'));
  const getDest = eval(`(item) => {
    return item.find(({ divider }) => divider === ${monkey.divisibleBy})['remainder'] === 0 ? '${monkey.whenTrue}' : '${monkey.whenFalse}';
  }`);
  const items = monkey.items.map(value => getMeasuringOrientedItem(value, dividers));

  const { id } = monkey;

  return { id, items, op, getDest };
};

const monkeyBusinessReducer = (monkeys: FunctionalMonkeyWithBusinessRecord[], _) => {
  const clonedMonkeys = monkeys.map(monkey => ({ ...monkey }));

  for (const monkey of clonedMonkeys) {
    const numItem = monkey.items.length;
    for (const item of monkey.items) {
      const adjustedConcern = Math.floor(monkey.op(item) / 3);
      const destId = monkey.getDest(adjustedConcern);
      const destMonkey = clonedMonkeys.find(monkey => monkey.id === destId);
      destMonkey.items.push(adjustedConcern);
    }

    monkey.items = [];
    monkey.inspectionCount = (monkey.inspectionCount ?? 0) + numItem;
  }

  return clonedMonkeys;
};

const getMeasuringOrientedItem = (value: number, dividers: number[]) => {
  return dividers.map(divider => ({ divider, remainder: value % divider }));
};

const monkeyBusinessReducerWithoutWorryDividen = (monkeys: EfficientFunctionalMonkeyWithBusinessRecord[], _) => {
  const clonedMonkeys = monkeys.map(monkey => ({ ...monkey }));

  for (const monkey of clonedMonkeys) {
    const numItem = monkey.items.length;
    for (const item of monkey.items) {
      const adjustedConcern = item.map(({ divider, remainder }) => getMeasuringOrientedItem(monkey.op(remainder), [divider])).flatMap(val => val);
      const destId = monkey.getDest(adjustedConcern);
      const destMonkey = clonedMonkeys.find(monkey => monkey.id === destId);
      destMonkey.items.push(adjustedConcern);
    }

    monkey.items = [];
    monkey.inspectionCount = (monkey.inspectionCount ?? 0) + numItem;
  }

  return clonedMonkeys;
};

export { parseLines, getFunctionalMonkey, getEfficientFunctionalMonkey, monkeyBusinessReducer, monkeyBusinessReducerWithoutWorryDividen };
