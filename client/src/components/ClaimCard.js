import React from 'react';
import './card.css';

import appetito from '../appetito';
import web3 from '../web3';

class ClaimCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { account: null, done: false };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    this.setState({ done: this.props.claim.done });
  }

  onButtonClick = async (event, claim) => {
    event.preventDefault();
    if (this.state.done) {
      return null;
    } else {
      if (this.state.account === claim.claimerAddress) {
        await appetito.methods.startStudy(this.props.index).send({
          from: this.state.account,
        });
      } else {
        await appetito.methods.approveClaim(this.props.index).send({
          from: this.state.account,
        });
      }
    }
  };

  renderButton(claimerAddress) {
    if (this.state.account === claimerAddress) {
      return (
        <div className='extra content'>
          <button className='ui button' onClick={(event) => this.onButtonClick(event, this.props.claim)}>
            {this.state.done ? 'Already done!' : 'Start Study!'}
          </button>
        </div>
      );
    } else {
      return (
        <div className='extra content'>
          <button className='ui button' onClick={(event) => this.onButtonClick(event, this.props.claim)}>
            {this.state.done ? 'Already done' : 'Approve'}
          </button>
        </div>
      );
    }
  }

  render() {
    console.log(this.props.claim);
    return (
      <div className='ui card'>
        <div className='content'>
          <div className='header'>{this.props.claim.claimerName}</div>
        </div>
        <div className='content'>
          <div className='ui header'>Dream Job: {this.props.claim.dreamJob}</div>
          <div className='ui small feed'>
            <div className='event'>
              <div className='content'>
                <div className='summary'>Material: {this.props.claim.materialTitle}</div>
              </div>
            </div>

            <div className='event'>
              <div className='content'>
                <div className='summary'>Source: {this.props.claim.urlSource}</div>
              </div>
            </div>

            <div className='event'>
              <div className='content'>
                <div className='summary'>Description: {this.props.claim.description}</div>
              </div>
            </div>

            <div className='event'>
              <div className='content'>
                <div className='summary'>Amount: {this.props.claim.amount}</div>
              </div>
            </div>

            <div className='event'>
              <div className='content'>
                <div className='summary'>Claimer Address: {this.props.claim.claimerAddress}</div>
              </div>
            </div>

            <div className='event'>
              <div className='content'>
                <div className='summary'>Recipient Address: {this.props.claim.recipientAddress}</div>
              </div>
            </div>

            <div className='event'>
              <div className='content'>
                <div className='summary'>
                  Status: {this.props.claim.done ? 'Yes' : 'No'} {this.props.claim.approvedCounts}/
                  {this.props.population}
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.renderButton(this.props.claim.claimerAddress)}
      </div>
    );
  }
}

export default ClaimCard;
