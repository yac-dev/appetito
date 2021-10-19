import React from 'react';
import appetito from '../appetito';
import web3 from '../web3';

class Contibute extends React.Component {
  state = { pendingMessage: '', nickname: '', amount: 0 };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts(); // accountsっていうか、結局一つのaccountのみを取ってくれるようになっている。
    this.setState({ pendingMessage: 'Processing your contribution. Generally, it takes 15 sec.' });

    await appetito.methods.contribute(this.state.nickname).send({
      from: accounts[0],
      value: this.state.amount,
    });

    this.setState({ pendingMessage: 'Your contribution is processed successfully!' });
  };

  onValueChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  render() {
    return (
      <div>
        <form className='ui form' onSubmit={this.onFormSubmit}>
          <div className='field'>
            <label>Nickname</label>
            <input
              value={this.state.nickname}
              onChange={(event) => this.setState({ nickname: event.target.value })}
              placeholder='Please enter your nickname'
            />

            <label>How much ether you gonna send?</label>
            <input
              value={this.state.amount}
              onChange={(event) => this.setState({ amount: event.target.value })}
              placeholder='Required at least 100 wei'
            />
          </div>
          <button>Contribute!</button>
        </form>
        <div>{this.state.pendingMessage}</div>
      </div>
    );
  }
}

export default Contibute;
