import React from 'react';
import appetito from '../appetito';
import web3 from '../web3';

class Claim extends React.Component {
  state = {
    pendingMessage: '',
    claimerName: '',
    dreamJob: '',
    materialTitle: '',
    urlSource: '',
    purpose: '',
    value: '',
    recipientAddress: '',
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const { claimerName, dreamJob, materialTitle, urlSource, purpose, value, recipientAddress } = this.state;
    this.setState({ pendingMessage: 'Processing your claim. Generally, it takes 15 sec.' });

    try {
      await appetito.methods
        .claim(claimerName, dreamJob, materialTitle, urlSource, purpose, value, recipientAddress)
        .send({ from: accounts[0] });

      this.setState({ pendingMessage: 'Your claim is processed successfully!' });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className='ui container'>
        <form className='ui form' onSubmit={this.onFormSubmit}>
          <div className='field'></div>
          <label>Nickname</label>
          <input
            value={this.state.claimerName}
            onChange={(event) => this.setState({ claimerName: event.target.value })}
            placeholder='Please enter your nickname'
          />

          <label>DreamJob</label>
          <input
            value={this.state.dreamJob}
            onChange={(event) => this.setState({ dreamJob: event.target.value })}
            placeholder='What you wanna be?'
          />

          <label>Material</label>
          <input
            value={this.state.materialTitle}
            onChange={(event) => this.setState({ materialTitle: event.target.value })}
            placeholder='What you need?'
          />

          <label>Material's URL</label>
          <input
            value={this.state.urlSource}
            onChange={(event) => this.setState({ urlSource: event.target.value })}
            placeholder='Please paste url of the material as a proof'
          />

          <label>Purpose</label>
          <textarea
            value={this.state.purpose}
            onChange={(event) => this.setState({ purpose: event.target.value })}
            placeholder='Describe some details, why you wanna be the job, why you need the materilas etc'
            cols={50}
            rows={5}
          />

          <label>Amount</label>
          <input
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
            placeholder='How much you need?'
          />

          <label>Recipient Address</label>
          <input
            value={this.state.recipientAddress}
            onChange={(event) => this.setState({ recipientAddress: event.target.value })}
            placeholder='Where we send to?'
          />
          <button class='ui button'>Claim!</button>
        </form>
        <hr />
        <div>{this.state.pendingMessage}</div>
      </div>
    );
  }
}

export default Claim;
