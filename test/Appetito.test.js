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
    .send({ from: accounts[0], gas: '5000000', gasPrice: '30000000' });
  // const contractBalance = await web3.eth.getBalance(accounts[0]);
  // const one = await web3.eth.getBalance(accounts[1]);
  // console.log(contractBalance); // これで、ganache accountのbalanceを確認できる。
  // console.log(one); // contractのbalance自体を確認したい時は、getBalance(appetito.options.address)。
});

describe('Appetito test!', () => {
  it('deploys an appetito contract on ganache network and contract has an address', async () => {
    assert.ok(appetito.options.address);
  });

  it('marks creator as an owner', async () => {
    const owner = await appetito.methods.owner().call();

    assert.equal(owner, accounts[0]);
  });

  it('allows everybody to contribute ether and marks them', async () => {
    // const accountBalance = await web3.eth.getBalance(accounts[1]);
    // console.log(accountBalance);

    await appetito.methods.contribute('myname').send({
      value: '100',
      from: accounts[1],
      gas: '5000000',
      gasPrice: '30000000',
    }); // これだと上手く動く。

    const contributor = await appetito.methods.contributors(0).call();
    const contributors = await appetito.methods.getContributors().call();
    assert.ok(contributor); // truthyかのtest。
    assert.equal(contributors.length, 1);

    const population = await appetito.methods.population().call();
    assert.equal(population, 2); // contract creatorとccontributor
  });

  it('allows people to claim and approve it', async () => {
    await appetito.methods
      .claim('Bob', 'Software Engineer', 'Book', 'https://abc.com', 'Wanna study!', 10, accounts[2])
      .send({ from: accounts[1], gas: '5000000', gasPrice: '30000000' });

    let claim = await appetito.methods.claims(0).call();
    assert.equal(claim.claimerName, 'Bob');
    assert.equal(claim.amount, 10);

    const claimsCount = await appetito.methods.getClaimsCount().call();
    assert.equal(claimsCount, 1);
    // ここまでclaim。

    // ここからapprove。
    await appetito.methods.approveClaim(0).send({
      from: accounts[0],
      gas: '5000000',
      gasPrice: '30000000',
    });

    claim = await appetito.methods.claims(0).call();
    assert.equal(claim.approvedCounts, 1);
    assert.ok(claim.done === false);

    let beforeStartStudyBalance = await web3.eth.getBalance(accounts[2]);
    beforeStartStudyBalance = parseInt(beforeStartStudyBalance);

    // ここからstartStudy。
    await appetito.methods.startStudy(0).send({
      from: accounts[1],
      value: claim.amount,
      gas: '5000000',
      gasPrice: '30000000',
    });

    claim = await appetito.methods.claims(0).call();
    assert.ok(claim.done);

    let afterStartStudyBalance = await web3.eth.getBalance(accounts[2]);
    afterStartStudyBalance = parseInt(afterStartStudyBalance);
    // console.log(beforeStartStudyBalance);
    console.log(afterStartStudyBalance);
    // assert.ok(afterStartStudyBalance - beforeStartStudyBalance > 0); // ?????
  });
});
