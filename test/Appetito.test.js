const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const compiledAppetito = require('../ethereum/build/Appetito.json');

const web3 = new Web3(ganache.provider());

let accounts;
let appetito;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  appetito = await new web3.eth.Contract(compiledAppetito.abi) // JSON.parseはいらないのか。
    .deploy({
      data: compiledAppetito.evm.bytecode.object,
    })
    .send({ from: accounts[0], gas: '5000000' });
});

describe('Appetito test!', () => {
  it('deploys an appetito contract on ethereum network!', async () => {
    assert.ok(appetito.options.address);
  });

  it('marks yosuke as an owner', async () => {
    const owner = await appetito.methods.owner().call();
    assert.equal(owner, accounts[0]);
  });

  it('allows everybody to donate ether money and marks them', () => {});
});
