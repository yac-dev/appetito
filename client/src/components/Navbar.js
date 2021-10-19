import React from 'react';
import { Link } from 'react-router-dom';

// components
import NavAnchor from './NavAnchor';

class Navbar extends React.Component {
  render() {
    return (
      <div className='ui inverted secondary pointing menu'>
        <NavAnchor to={'/'} tagName={'Appetito.p2p'} />
        <NavAnchor to={'/ether/claim'} tagName={'Claim'} />
        <NavAnchor to={'/ether/claimlist'} tagName={'Claim List'} />
        <NavAnchor to={'/ether/contribute'} tagName={'Contribute'} />

        {/* <Link to='/' className={`${this.state.isActive ? 'active' : ''} item`}>
          Appetito.p2p
        </Link>
        <Link to='/ether/claim' className='item'>
          Claim
        </Link>
        <Link to='/ether/claimlist' className='item'>
          Claimlist
        </Link>
        <Link to='/ether/contribute' className='item'>
          Contribute
        </Link> */}
      </div>
    );
  }
}

export default Navbar;
