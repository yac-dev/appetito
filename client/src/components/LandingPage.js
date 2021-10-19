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
      </div>
    );
  }
}

export default LandingPage;
