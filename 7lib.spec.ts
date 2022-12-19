import { mapPathToSize } from './7lib';

describe('7, mapPathToSize', () => {
  it('does the job', () => {
    const input = [
      '$ cd /',
      '$ ls',
      'dir a',
      '14848514 b.txt',
      '8504156 c.dat',
      'dir d',
      '$ cd a',
      '$ ls',
      'dir e',
      '29116 f',
      '2557 g',
      '62596 h.lst',
      '$ cd e',
      '$ ls',
      '584 i',
      '$ cd ..',
      '$ cd ..',
      '$ cd d',
      '$ ls',
      '4060174 j',
      '8033020 d.log',
      '5626152 d.ext',
      '7214296 k',
    ];

    const pathToSize = mapPathToSize(input);

    expect(pathToSize['/a/']).toBe(94853);
    expect(pathToSize['/d/']).toBe(24933642);
  });
});
