const fs = require('fs').promises;

const [input, output] = process.argv.slice(2);

fs.readFile(input)
  .then(data => String(data))
  .then(str => str.split('\n'))
  .then(arr => {
    const path = output ?? `${input.split('.')[0]}.json`;
    fs.writeFile(path, JSON.stringify(arr));
  });
