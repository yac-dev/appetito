import React from 'react';
// import { Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import appetito from './appetito';

import Map from './components/Map';
import Ex from './components/Example';

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
          {/* <Route path='/' exact component={Ex} /> */}
        </Router>
      </div>
    );
  }
}

export default App;
