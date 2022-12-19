import { getVisibleTreesInMatrix, getNumVisibleTrees } from './8lib';

const input = [
  '30373',
  '25512',
  '65332',
  '33549',
  '35390',
];

describe('8 lib / getVisibleTreesInMatrix', () => {
  it('works', () => {
    expect(getVisibleTreesInMatrix(input)).toHaveLength(21);
  });
});

describe('8 lib / getNumVisibleTrees', () => {
  it('works', () => {
    expect(getNumVisibleTrees(input, [1, 2])).toEqual([1, 1, 2, 2]);
    expect(getNumVisibleTrees(input, [3, 2])).toEqual([2, 2, 2, 1]);
  });
});
