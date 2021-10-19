import React from 'react';
import { Link } from 'react-router-dom';
import web3 from '../web3';
import appetito from '../appetito';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to Appetito!</h1>
        <h2>
          {this.props.population} people, {this.props.contractBalance} wei in this network and{' '}
          {this.props.contributorsNumber} helpful contributors!
        </h2>
        <div>
          <Link to={'/ether/claim'}>Are you passionate about somthing?</Link>
        </div>
        <p>or</p>
        <div>
          <Link to={'/ether/contribute'}>You wanna contribute for passions?</Link>
        </div>
        <p>owned by {this.props.owner}</p>
        <p>This smart contract exists on 0x796Ded0f529B409ea558c12Ec522cD905a1a1f57</p>
      </div>
    );
  }
}

export default LandingPage;
