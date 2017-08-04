import React from 'react';
import NavSearch from './NavSearch.jsx';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steamNickname: ''
    }
  }

  render() {  
    return(
      <nav className="navbar">
          <div className="section group">
            <div className="col span_1_of_3">
              <a href=''>Link 01</a>
            </div>
            <div className="col span_2_of_3">
              <NavSearch onNavSearch={this.props.onNavSearch}/>
            </div>
          </div>
      </nav>
    );
  }
}

export default Navbar;