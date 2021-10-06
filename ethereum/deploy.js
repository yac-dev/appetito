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
      .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

    console.log('Contract account deployed to', result.options.address);
  } catch (error) {
    console.log(error);
  }
};

deploy();
// 1st deployed contract address: 0x612738ec3d984c2801570a38761515B6B6A78f2d
