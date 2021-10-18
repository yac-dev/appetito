import React from 'react';
// import { Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// import appetito from './appetito';

//components
import LandingPage from './components/LandingPage';
import Contibute from './components/Contibute';
import Claim from './components/Claim';

class App extends React.Component {
  // async componentDidMount() {
  //   const owner = await appetito.methods.owner().call();
  //   console.log(owner);
  // }

  render() {
    return (
      <div className='ui container'>
        <Router>
          {/* <Route path='/' exact component={Map} /> */}
          <Route path='/' exact component={LandingPage} />
          <Route path='/ether/contribute' exact component={Contibute} />
          <Route path='/ether/claim' exact component={Claim} />
        </Router>
      </div>
    );
  }
}

export default App;
