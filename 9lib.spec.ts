import { dirNumToDirs, getTailPositionHistory, get9thTailHistory } from './9lib';

describe('9 getTailPositionHistory', () => {
  it('works', () => {
    const input = [
      'R 4',
      'U 4',
      'L 3',
      'D 1',
      'R 4',
      'D 1',
      'L 5',
      'R 2',
    ];

    const directions = input.map(dirNumToDirs).flatMap(val => val);
    expect(getTailPositionHistory(directions)).toHaveLength(13);
  });
});

describe('9 get9thTailHistory', () => {
  it('works', () => {
    const input = [
      'R 5',
      'U 8',
      'L 8',
      'D 3',
      'R 17',
      'D 10',
      'L 25',
      'U 20',
    ];

    const directions = input.map(dirNumToDirs).flatMap(val => val);
    expect(get9thTailHistory(directions)).toHaveLength(36);
  });
});
