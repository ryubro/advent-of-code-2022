const mapPathToSize = (input: string[]) => {
  let workingDir = '';
  let lastCommand = '';
  let pathToSize: Record<string, number> = { '/': 0 };

  for (const line of input) {
    if (line.startsWith('$ ')) {
      const [command, arg] = line.substring(2).split(' ');

      if (command === 'cd') {
        switch(arg) {
          case '/':
            workingDir = '/';
            break;
          case '..':
            workingDir = [...workingDir.split('/').slice(0, -2), ''].join('/');
            break;
          default:
            workingDir = workingDir === '/' ? `/${arg}/` : `${workingDir}${arg}/`;
            break;
        }
      };

      lastCommand = command;
    } else {
      if (lastCommand !== 'ls') {
        throw new Error(`Not sure what to do: ${JSON.stringify({ line, cursor: workingDir, lastCommand })}`);
      }

      const [typeOrSize, name] = line.split(' ');

      if (typeOrSize === 'dir') {
        pathToSize[`${workingDir}${name}/`] = 0;
      } else {
        const size = parseInt(typeOrSize, 10);
    
        const ancestors = workingDir.split('/').filter(dir => dir !== '').reduce((acc, dirSegment) => {
          const parent = acc[acc.length - 1];

          return [...acc, `${parent}${dirSegment}/`];
        }, ['/']);

        ancestors.forEach(path => {
          pathToSize[`${path}`] = pathToSize[`${path}`] + size;
        });

        pathToSize[`${workingDir}${name}`] = size;
      }
    }
  }

  return pathToSize;
};

export { mapPathToSize };
