import React from 'react';
// import { Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// sol
import appetito from './appetito';
import web3 from './web3';

//components
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Contibute from './components/Contibute';
import Claim from './components/Claim';
import ClaimList from './components/ClaimList';

class App extends React.Component {
  state = { contractBalance: null, contributorsNumber: null, population: null, owner: null };

  async componentDidMount() {
    const owner = await appetito.methods.owner().call();
    const contractBalance = await web3.eth.getBalance(appetito.options.address);
    const contributors = await appetito.methods.getContributors().call();
    const population = await appetito.methods.population().call();
    this.setState({ contractBalance, contributorsNumber: contributors.length, population, owner });
  }

  render() {
    return (
      <div className='ui container'>
        <Router>
          <div class='ui inverted segment'>
            <Navbar />
          </div>
          {/* <Route path='/' exact component={Map} /> */}
          <Route path='/' exact>
            <LandingPage
              contractBalance={this.state.contractBalance}
              contributorsNumber={this.state.contributorsNumber}
              population={this.state.population}
              owner={this.state.owner}
            />
          </Route>
          <Route path='/ether/contribute' exact component={Contibute} />
          <Route path='/ether/claim' exact component={Claim} />
          <Route path='/ether/claimlist' exact>
            <ClaimList population={this.state.population} />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
