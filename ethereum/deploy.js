require('dotenv').config({ path: '../config/dev.env' });
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledAppetito = require('./build/Appetito.json');

const provider = new HDWalletProvider(process.env.MNEMONIC_WORD, process.env.NODE_URL);

const web3 = new Web3(provider);

let compiledAbiForReact;
let contractAddressForReact;

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(compiledAppetito.abi)
      .deploy({ data: '0x' + compiledAppetito.evm.bytecode.object })
      .send({ gas: '5000000', gasPrice: '1000000000', from: accounts[0] });

    console.dir(compiledAppetito.abi, { depth: null });
    compiledAbiForReact = compiledAppetito.abi;

    console.log('Contract account deployed to', result.options.address);
    contractAddressForReact = result.options.address;
  } catch (error) {
    console.log(error);
  }
};

deploy();

module.exports = { compiledAbiForReact, contractAddressForReact };

// 1st deployed contract address: 0x612738ec3d984c2801570a38761515B6B6A78f2d
// 2nd deployed contract address: 0x5e2960655Ab5bE255c5E63A3F81Bb8700b62C156
// 0x5f0202cD9A2f439fbe13932186EA0595a4F32abA
// 4th 0xa8E565e0FC9eeA5f06c1dDD54a8e4476101006a7
// 5th 0xedA47Bb14473820Deaa20c15d2Caa57c7a73e08D
// 6th 0xfb7946459548939eA5C950c66517289a9EABfc8f
// 7 0x63A7688AAa7D2f0F3e7fe4f811b33AE49ce8D4Aa
// 8 0x796Ded0f529B409ea558c12Ec522cD905a1a1f57
