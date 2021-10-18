import React from 'react';
import { Link } from 'react-router-dom';
import web3 from '../web3';
import appetito from '../appetito';

class LandingPage extends React.Component {
  state = { contractBalance: null, contributorsNumber: null };

  async componentDidMount() {
    const contractBalance = await web3.eth.getBalance(appetito.options.address);
    const contributors = await appetito.methods.getContributors().call();
    this.setState({ contractBalance, contributorsNumber: contributors.length });
  }

  render() {
    return (
      <div>
        <h1>Welcome to Appetito!</h1>
        <h2>
          Here we have {this.state.contractBalance} wei and {this.state.contributorsNumber} really helpful contributors.
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
