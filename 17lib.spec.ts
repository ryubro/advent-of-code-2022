import { byPattern, rockReducer, rocksGenerator, trim } from './17lib';
import { reduce } from './utils/generator';

import type { Cell, Direction } from './17lib';

describe('17 directionReducer', () => {
  it('works', () => {
    const directionGenerator = function*() {
      while (true) {
        yield* '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>' as Iterable<Direction>;
      }
    };

    // const chamber = reduce(rocksGenerator(2022),
    //   rockReducer(directionGenerator()),
    //   [['#', '#', '#', '#', '#', '#', '#']] as Cell[][],
    // );

    // expect(trim(chamber).length - 1).toBe(3068);
    expect(byPattern(49, 35)('>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>' as Iterable<Direction>, 2022)).toBe(3068);
  });
});
