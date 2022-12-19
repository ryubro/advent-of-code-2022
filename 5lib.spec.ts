import { handleInput, handleInputBy9001 } from './5lib';

describe('lib 5', () => {
  const input = {
    stacks: [
      ['N', 'Z'],
      ['D', 'C', 'M'],
      ['P']
    ],
    commands: [
      { quantity: 1, from: 1, to: 0 },
      { quantity: 3, from: 0, to: 2 },
      { quantity: 2, from: 1, to: 0 },
      { quantity: 1, from: 0, to: 1 },
    ]
  };

  it('handles input', () => {
    expect(handleInput({ ...input })).toEqual([['C'], ['M'], ['Z', 'N', 'D', 'P']]);
  });

  it('handles input by 9001', () => {
    expect(handleInputBy9001({ ...input })).toEqual([['M'], ['C'], ['D', 'N', 'Z', 'P']]);
  });
});
