import { reduce } from "./utils/generator";

type Cell = '.' | '@' | '#' | 'X';

type Direction = '<' | '>';

type Sprite = ReturnType<typeof getRockSprite>;

const rockRepeater = function* () {
  const rocks = new Set<Cell[][]>([
    [
      ['@', '@', '@', '@'], 
    ],
    [
      ['.', '@', '.'],
      ['@', '@', '@'],
      ['.', '@', '.'],
    ],
    [
      ['.', '.', '@'],
      ['.', '.', '@'],
      ['@', '@', '@'],
    ],
    [
      ['@'],
      ['@'],
      ['@'],
      ['@'],
    ],
    [
      ['@', '@'],
      ['@', '@'],
    ],
  ]);

  while (true) {
    yield* rocks;
  }
};

const rocksGenerator = function* (length: number) {
  const rocks = rockRepeater();
  let counter = 0;
  for (const rock of rocks) {
    yield rock;
    if (++counter === length) {
      return;
    }
  }
}

const getRockSprite = (map: Cell[][]) => {
  const rockPositions = map.reduce((positions, line, indey) => {
    const xPositions = line.reduce((xPos, el, index) => {
      if (el === '@') {
        return [...xPos, index];
      }

      return xPos;
    }, [] as number[]);

    return [...positions, ...xPositions.map(x => ([x, indey]))];
  }, [] as number[][]);

  const allXs = rockPositions.map(([x, ]) => x);
  const allYs = rockPositions.map(([_, y]) => y);

  const minX = Math.min(...allXs);
  const maxX = Math.max(...allXs);
  const minY = Math.min(...allYs);
  const maxY = Math.max(...allYs);

  const sprite: Cell[][] = Array.from(Array(maxY - minY + 1)).map(_ => Array.from(Array(maxX - minX + 1)).map(_ => '.'));
  rockPositions.forEach(([x, y]) => {
    sprite[y - minY][x - minX] = '@';
  });

  return {
    minX,
    maxX,
    minY,
    maxY,
    sprite,
  };
};

const removeRock = (map: Cell[][]) => {
  return map.map(
    line => Array.from(
      line.join('').replaceAll('@', '.'),
    ) as Cell[],
  );
};

const paintRock = (map: Cell[][], rockSprite: Sprite) => {
  const { minX, minY, sprite } = rockSprite;

  const positions = sprite.reduce((pos, line, y) => {
    const xPostions = line.reduce((xPos, el, x) => {
      if (el === '@') {
        return [...xPos, x + minX];
      }

      return xPos;
    }, [] as number[]);

    return [...pos, ...xPostions.map(x => [x, y + minY])];
  }, [] as number[][]);

  let hasCollision = false;

  positions.forEach(([x, y]) => {
    map[y][x] = '#';
  });

  return map;
};

const pusher = (sprite: Sprite, map: Cell[][], direction: Direction) => {
  let pushedRockSprite: Sprite;

  if (direction === '<') {
    if (sprite.minX === 0) {
      pushedRockSprite = sprite;
    } else {
      pushedRockSprite = {
        ...sprite,
        minX: sprite.minX - 1,
        maxX: sprite.maxX - 1,
      }
    }
  }

  if (direction === '>') {
    if (sprite.maxX === map[0].length - 1) {
      pushedRockSprite = sprite;
    } else {
      pushedRockSprite = {
        ...sprite,
        minX: sprite.minX + 1,
        maxX: sprite.maxX + 1,
      };
    }
  };

  return pushedRockSprite;
};

const hasCollision = (rockSprite: Sprite, map: Cell[][]) => {
  const { minX, minY, sprite } = rockSprite;

  const positions = sprite.reduce((pos, line, y) => {
    const xPostions = line.reduce((xPos, el, x) => {
      if (el === '@') {
        return [...xPos, x + minX];
      }

      return xPos;
    }, [] as number[]);

    return [...pos, ...xPostions.map(x => [x, y + minY])];
  }, [] as number[][]);

  let hasCollision = false;

  return positions.find(([x, y]) => map[y][x] === '#') !== undefined;
};

const dropper = (sprite: Sprite) => {
  return {...sprite, minY: sprite.minY + 1, maxY: sprite.maxY + 1};
};

const trim = (map: Cell[][]) => {
  return map.reduce((trimmed, line) => {
    if (trimmed.length !== 0) {
      return [...trimmed, line];
    }

    if (line.every(cell => cell === '.')) {
      return [];
    } else {
      return [line];
    }
  }, [] as Cell[][]);
}

const spriteToGraphic = (rock: Sprite) => {
  const { minX, minY, maxX, sprite } = rock;

  const emptyLines = Array.from(Array(minY)).map(_ => Array.from(Array(maxX + 1)).map(_ => '.').join(''));
  const spriteLines = sprite.map(line => [...Array.from(Array(minX)).map(_ => '.'), ...line].join(''));

  return [...emptyLines, ...spriteLines].join('\n');
};

const getBlank = () => Array.from(Array(7)).map(_ => '.' as Cell);

let maxMove = 0;
let counter = 0;

const rockReducer = (directions: Iterator<Direction>) => (chamber: Cell[][], rock: Cell[][]) => {
  let toPush = { minX: 2, minY: 0, maxX: 2 + rock[0].length - 1, maxY: 0 + rock.length - 1, sprite: rock };

  chamber = [getBlank(), getBlank(), getBlank(), ...Array.from(Array(toPush.maxY + 1)).map(getBlank), ...trim(chamber)];

  let numMove = 0;
  while (true) {
    const pushed = pusher(toPush, chamber, directions.next().value);

    let toDrop = pushed;
    if (hasCollision(pushed, chamber)) {
      toDrop = toPush;
    }
    const dropped = dropper(toDrop);
    numMove++;

    if (hasCollision(dropped, chamber)) {
      counter++;
      if (numMove >= maxMove) {
        maxMove = numMove;
        // console.log({ maxMove, counter });
      }
      return paintRock(chamber, toDrop);
    }

    toPush = dropped;
  }
}; 

const directionGenerator = function*(directions) {
  while (true) {
    yield* directions as Iterable<Direction>;
  }
};

const byPattern = (patternStartsAt: number, freqency: number) => (directionsInput: Iterable<Direction>, num: number) => {
  const numRepeat = Math.floor((num - patternStartsAt) / freqency);
  const numRemain = (num - patternStartsAt) % freqency;

  const chamberForRemainder = reduce(
    rocksGenerator(patternStartsAt + numRemain),
    rockReducer(directionGenerator(directionsInput)),
    [['#', '#', '#', '#', '#', '#', '#']] as Cell[][]
  );
  const chamberForInitial = reduce(
    rocksGenerator(patternStartsAt),
    rockReducer(directionGenerator(directionsInput)),
    [['#', '#', '#', '#', '#', '#', '#']] as Cell[][]
  );
  const chamberForPattern = reduce(
    rocksGenerator(patternStartsAt + freqency),
    rockReducer(directionGenerator(directionsInput)),
    [['#', '#', '#', '#', '#', '#', '#']] as Cell[][]
  );

  const numLinesAtPatternStarts = trim(chamberForInitial).length - 1;
  const numLinesAfterFirstRepeat = trim(chamberForPattern).length - 1;

  return (
    numLinesAtPatternStarts + 
    numRepeat * (numLinesAfterFirstRepeat - numLinesAtPatternStarts) + 
    trim(chamberForRemainder).length - 1 - numLinesAtPatternStarts
  );
};

export { rockReducer, rocksGenerator, trim, byPattern };
export type { Direction, Cell };
