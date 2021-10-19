import React from 'react';
import appetito from '../appetito';
// import web3 from '../web3';

// modules
import ClaimCard from './ClaimCard';

class ClaimList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { claims: '' };
  }

  async componentDidMount() {
    const claimsCount = await appetito.methods.getClaimsCount().call();
    // console.log(claimsCount);
    const claims = await Promise.all(
      Array(claimsCount)
        .fill()
        .map((element, index) => {
          return appetito.methods.claims(index).call();
        })
    );
    this.setState({ claims });
  }

  render() {
    if (!this.state.claims) {
      return null;
    } else {
      console.log(this.state.claims);
      const lists = this.state.claims.map((claim, index) => {
        return <ClaimCard claim={claim} index={index} population={this.props.population} />;
      });
      return (
        <div>
          <div>{lists}</div>
        </div>
      );
    }
  }
}

export default ClaimList;
