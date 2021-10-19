import React from 'react';
import { Link } from 'react-router-dom';

class NavAnchor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  onAnchorClick = () => {
    this.setState({ isOpen: false });
    this.setState({ isOpen: true });
  };

  render() {
    console.log(window.location.href);
    return (
      <div onClick={this.onAnchorClick}>
        <Link to={this.props.to} className={`${this.state.isOpen ? 'active' : ''} item `}>
          {this.props.tagName}
        </Link>
      </div>
    );
  }
}

export default NavAnchor;
