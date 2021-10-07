require('dotenv').config({ path: '../config/dev.env' });
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledAppetito = require('./build/Appetito.json');

const provider = new HDWalletProvider(process.env.MNEMONIC_WORD, process.env.NODE_URL);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(compiledAppetito.abi)
      .deploy({ data: '0x' + compiledAppetito.evm.bytecode.object })
      .send({ gas: '5000000', gasPrice: '5000000000', from: accounts[0] });

    console.dir(compiledAppetito.abi, { depth: null });
    console.log('Contract account deployed to', result.options.address);
  } catch (error) {
    console.log(error);
  }
};

deploy();
// 1st deployed contract address: 0x612738ec3d984c2801570a38761515B6B6A78f2d
// 2nd deployed contract address: 0x5e2960655Ab5bE255c5E63A3F81Bb8700b62C156
// 0x5f0202cD9A2f439fbe13932186EA0595a4F32abA
// 4th 0xa8E565e0FC9eeA5f06c1dDD54a8e4476101006a7
// 5th 0xedA47Bb14473820Deaa20c15d2Caa57c7a73e08D
