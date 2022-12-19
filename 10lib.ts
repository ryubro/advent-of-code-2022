const instructionReducer = (acc: number[], instruction: string) => {
  const history = acc.slice(0, -1);
  const value = acc[acc.length - 1];

  if (instruction === 'noop') {
    return [...history, value, value];
  }

  const [_command, arg] = instruction.split(' ');

  return [...history, value, value, value + parseInt(arg)];
};

const lineReducer = (cycles: number[]) => {
};

const renderScreen = (cycles: number[]) => {
  const lines = [
    cycles.slice(0, 40),
    cycles.slice(40, 80),
    cycles.slice(80, 120),
    cycles.slice(120, 160),
    cycles.slice(160, 200),
    cycles.slice(200, 240),
  ];

  return lines.map(line => line.map((value, index) => {
    const sprite = [value - 1, value, value + 1];
    return sprite.includes(index) ? '#' : '.';
  }).join(''));
};

export { instructionReducer, renderScreen };

