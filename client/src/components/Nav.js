import React from "react";
import { NavLink} from 'react-router-dom'

const Nav = (props) => {


  return (
    <div className="navbar navbar-dark bg-transparent justify-content-between">
      <div className='nav-block'>
        <a href="..." className="navbar-brand">Video Chat App</a>
      </div>

      <div className='nav-block'>
        <NavLink to='/' className="nav-button">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>
        <NavLink to='/contacts' className="nav-button">
          <i className="fas fa-user-friends"></i>
          <span>Contacts</span>
        </NavLink>
      </div>

      <div className='nav-block' >
        <div className='avatar-circle'>
          <span className='initials'>{props.name.charAt(0)}</span>
        </div>
      </div>

    </div>
  );
};

export default Nav;



// <div className='nav-button dropdown' id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//   <div className='avatar-circle'>
//     <span className='initials'>{props.name.charAt(0)}</span>
//   </div>
//
//   <div className="dropdown-menu " aria-labelledby="dropdownMenu">
//     <div className="dropdown-header">{props.name}</div>
//     <div className="dropdown-divider"></div>
//     <button className="dropdown-item" onClick={(e) => logout(e)}>Sign Out</button>
//   </div>
// </div>
