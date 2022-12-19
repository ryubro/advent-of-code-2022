const fs = require('fs').promises;

const getLines = async () => {
  const data = await fs.readFile('./5input.txt');

  return String(data).split('\n');
};

const getStacks = (lines: string[]) => {
  const relevantLines = lines.filter(line => line.match(/\w*\[[A-Z]\]/));

  let stacks = [];
  relevantLines.forEach(line => {
    Array.from(line).forEach((char, index) => {
      if (char.match(/[A-Z]/)) {
        const col = (index - 1) / 4;

        // console.log({ char, col });
        stacks[col] = [...(stacks[col] ?? []), char];
      }
    });
  });

  return stacks;
};

const getCommands = (lines: string[]) => {
  const relevantLines = lines.filter(line => line.startsWith('move'));

  return relevantLines.map(line => {
    const match = line.match(/move (\d+) from (\d+) to (\d+)/);

    return { quantity: parseInt(match[1], 10), from: parseInt(match[2], 10) - 1, to: parseInt(match[3], 10) - 1 };
  });
};

getLines()
  .then(lines => {
    const stacks = getStacks(lines);
    const commands = getCommands(lines);

    fs.writeFile('./5input.json', JSON.stringify({ stacks, commands }, null, 2));
  });
