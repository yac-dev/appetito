import React from 'react';
import logo from './logo.svg';
import './App.css';
import appetito from './appetito';

class App extends React.Component {
  async componentDidMount() {
    const owner = await appetito.methods.owner().call();
    console.log(owner);
  }

  render() {
    return (
      <div className='App'>
        <div>Hello ethereum</div>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className='App'>
//       <header className='App-header'>
//         <img src={logo} className='App-logo' alt='logo' />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
