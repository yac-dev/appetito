import React from 'react';
import appetito from '../appetito';
// import web3 from '../web3';

// modules
import ClaimCard from './ClaimCard';

class ClaimList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { claims: '', pendingMessage: '' };
  }

  async componentDidMount() {
    const claimsCount = await appetito.methods.getClaimsCount().call();
    console.log(claimsCount);
    // ここ動いてないなーちゃんと。
    const claims = await Promise.all(
      new Array(parseInt(claimsCount)).fill().map((element, index) => {
        return appetito.methods.claims(index).call();
      })
    );
    // const claims = new Array(claimsCount).fill();
    console.log(claims);
    this.setState({ claims });
  }

  render() {
    if (!this.state.claims) {
      return null;
    } else {
      const lists = this.state.claims.map((claim, index) => {
        return (
          <ClaimCard
            claim={claim}
            index={index}
            population={this.props.population}
            pendingMessage={this.state.pendingMessage}
          />
        );
      });
      console.log(this.state.claims);
      return (
        <div>
          <div className='ui cards'>{lists}</div>
          <hr />
          <div>{this.state.pendingMessage}</div>
        </div>
      );
    }
  }
}

export default ClaimList;
