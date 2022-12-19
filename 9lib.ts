type Direction = 'l' | 'r' | 'u' | 'd';

type Position = { x: number, y: number }

const tailPositionReducer = (tailPos: Position, headPos: Position) => {
  const { x: hx, y: hy } = headPos;
  const { x: tx, y: ty } = tailPos;

  const delta = { x: hx - tx, y: hy - ty };
  const distance = { x: Math.abs(delta.x), y: Math.abs(delta.y) };

  if (Math.max(distance.x, distance.y) <= 1) {
    return tailPos;
  }

  if (distance.x === 0) {
    return { x: tx, y: (delta.y > 0 ? ty + 1 : ty - 1) };
  }

  if (distance.y === 0) {
    return { x: (delta.x > 0 ? tx + 1 : tx - 1), y: ty };
  }

  return {
    x: (delta.x > 0 ? tx + 1 : tx - 1),
    y: (delta.y > 0 ? ty + 1 : ty - 1),
  };
};

const positionReducer = (knots: Position[], move: Direction) => {
  const [head, ...tails] = knots;
  let { x: hx, y: hy } = head;

  switch (move) {
    case 'l':
      hx = hx - 1;
      break;
    case 'r':
      hx = hx + 1;
      break;
    case 'u':
      hy = hy + 1;
      break;
    case 'd':
      hy = hy - 1;
      break;
  }

  return tails.reduce((newTails, pos) => {
    const lastTail = newTails[newTails.length - 1];

    return [...newTails, tailPositionReducer(pos, lastTail)];
  }, [{ x: hx, y: hy }]);
};

type AccTailPostionHistory = { tailPosHistory: Position[], knots: Position[] };

const tailPositionHistoryReducer = (acc: AccTailPostionHistory, move: Direction) => {
  const { knots: [head, ...tails], tailPosHistory } = acc;
  const [newHead, ...newTails] = positionReducer([head, ...tails], move);

  const lastTail = newTails[newTails.length - 1];

  if (tailPosHistory.find(({ x, y }) => x === lastTail.x && y === lastTail.y)) {
    return {
      knots: [newHead, ...newTails],
      tailPosHistory,
    };
  }

  return {
    knots: [newHead, ...newTails],
    tailPosHistory: [...tailPosHistory, lastTail],
  };
};

const getTailPositionHistory = (moves: Direction[]) => {
  const { tailPosHistory } = moves.reduce<AccTailPostionHistory>(
    tailPositionHistoryReducer,
    { knots: [{ x: 0, y: 0 }, { x: 0, y: 0 }], tailPosHistory: [{ x: 0, y: 0 }] },
  );

  return tailPosHistory;
};

const get9thTailHistory = (moves: Direction[]) => {
  const { tailPosHistory } = moves.reduce<AccTailPostionHistory>(
    tailPositionHistoryReducer,
    {
      knots: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      tailPosHistory: [{ x: 0, y: 0 }],
    },
  );

  return tailPosHistory;
};

const dirNumToDirs = (dirNum: string) => {
  const [dir, num] = dirNum.split(' ');

  return Array.from(Array(parseInt(num, 10))).map(() => dir.toLowerCase() as Direction);
};

export { getTailPositionHistory, dirNumToDirs, get9thTailHistory };
