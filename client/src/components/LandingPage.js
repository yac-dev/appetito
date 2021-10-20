import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <div className='landing-header'>
        <h1>
          Welcome to Appetito.p2p!!<i className='ethereum icon'></i>
        </h1>
        <h2>Status</h2>
        <table class='ui blue table'>
          <thead>
            <tr>
              <th>Contract Balance</th>
              <th>Contract Address</th>
              <th>Network Population</th>
              <th>Contributors</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.contractBalance} wei</td>
              <td>0x796Ded0f529B409ea558c12Ec522cD905a1a1f57</td>
              <td>{this.props.population} people</td>
              <td>{this.props.contributorsNumber} people</td>
            </tr>
          </tbody>
        </table>

        <div>
          <Link to={'/ether/claim'}>Are you passionate about somthing?</Link> or{' '}
          <Link to={'/ether/contribute'}>You wanna contribute for passions?</Link>
        </div>

        <div className='footer'>
          {' '}
          <div className='inside'>
            <hr />
            <p>created by {this.props.owner}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
