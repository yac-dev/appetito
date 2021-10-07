import React from 'react';
// import { Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import appetito from './appetito';

//components
import Contibute from './components/Contibute';
import Map from './components/Map';

class App extends React.Component {
  async componentDidMount() {
    const owner = await appetito.methods.owner().call();
    console.log(owner);
  }

  render() {
    return (
      <div>
        <Router>
          <Route path='/' exact component={Map} />
          <Route path='/ether/contribute' exact component={Contibute} />
        </Router>
      </div>
    );
  }
}

export default App;
