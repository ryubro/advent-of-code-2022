import { func, func1, inputToMap } from './12lib';

describe('12 lib', () => {
  const input = [
    'Sabqponm',
    'abcryxxl',
    'accszExk',
    'acctuvwj',
    'abdefghi',
  ];

  it('works', () => {
    const { map, start, dest } = inputToMap(input);

    let explored = [];

    expect(func(map, explored, dest, start)).toBe(31);
  });

  it('works, too', () => {
    const { map, start, dest } = inputToMap(input);

    let explored = [];

    expect(func1(map, explored, start, dest)).toBe(29);
  });


});