import React from 'react';
import appetito from '../appetito';

class Contibute extends React.Component {
  render() {
    return (
      <form className='ui form'>
        <div className='field'>
          <label>How much ether you gonna send?</label>
          <input name='blahhh' placeholder='Required at least 1 ether' />
          <label>NickName</label>
          <input name='blahhh' placeholder='Please enter your nickname' />
        </div>
      </form>
    );
  }
}

export default Contibute;
