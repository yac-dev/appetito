const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const appetitoPath = path.resolve(__dirname, 'contracts', 'Appetito.sol');
const source = fs.readFileSync(appetitoPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Appetito.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Appetito.sol']; // これで、interfaceは取れているのかね？bytecodeは見つかるけど。→abiはある。

// const output = solc.compile(source, 1).contracts[':Appetito']; // :Apetito この書き方、古いな。
// console.log(output);
// fs.ensureDirSync(buildPath);
fs.outputJSONSync(path.resolve(buildPath, 'Appetito.json'), output['Appetito']); // objectのkey名だけ取りたいな。
