import React from 'react';
import appetito from '../appetito';

class Claim extends React.Component {
  state = {
    claimerName: '',
    dreamJob: '',
    materialTitle: '',
    urlSource: '',
    purpose: '',
    amount: '',
    recipientAddress: '',
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    const formValues = {
      claimerName: this.state.claimerName,
      dreamJob: this.state.dreamJob,
      materialTitle: this.state.materialTitle,
      urlSource: this.state.urlSource,
      purpose: this.state.purpose,
      value: this.state.value,
      recipientAddress: this.state.recipientAddress,
    };
    console.log(formValues);
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

          <label>Description</label>
          <textarea
            value={this.state.purpose}
            onChange={(event) => this.setState({ purpose: event.target.value })}
            placeholder='Describe some details, why you wanna be the job, why you need the materilas etc'
            cols={50}
            rows={5}
          />

          <label>Amount</label>
          <input
            value={this.state.amount}
            onChange={(event) => this.setState({ value: event.target.value })}
            placeholder='How much you need?'
          />

          <label>Recipient Address</label>
          <input
            value={this.state.recipientAddress}
            onChange={(event) => this.setState({ recipientAddress: event.target.value })}
            placeholder='Where we send to?'
          />
          <button>Claim!</button>
        </form>
      </div>
    );
  }
}

export default Claim;
