import React from 'react';

const Navbar = (props) => {

  return(
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img alt="Steam DB" width="25px" src="http://i.imgur.com/MOLJU38.png"/>
            </a>
          </div>
          <div className="pull-right">Steam DB - MVP</div>
        </div>
      </nav>
  );
}

export default Navbar;