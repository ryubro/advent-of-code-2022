type Input = {
  stacks: string[][],
  commands: Array<{ quantity: number, from: number, to: number }>;
};

const handleInput = (input: Input) => {
  const { stacks, commands } = input;

  return commands.reduce((appliedStack, command) => {
    const { quantity, from, to } = command;

    const unloaded = appliedStack[from].slice(0, quantity);
    appliedStack[from] = [...appliedStack[from].slice(quantity)];
    appliedStack[to] = [...unloaded.reverse(), ...appliedStack[to]];

    return appliedStack;
  }, [...stacks]);
};

const handleInputBy9001 = (input: Input) => {
  const { stacks, commands } = input;

  return commands.reduce((appliedStack, command) => {
    const { quantity, from, to } = command;

    const unloaded = appliedStack[from].slice(0, quantity);
    appliedStack[from] = [...appliedStack[from].slice(quantity)];
    appliedStack[to] = [...unloaded, ...appliedStack[to]];

    return appliedStack;
  }, [...stacks]);
};

export { handleInput, handleInputBy9001 };
