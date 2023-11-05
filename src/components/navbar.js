import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <div id="navbar" className='row'>
      <Link className='navElem' to="/map">Map</Link>
      <Link className='navElem' to="/nothing">Nothing</Link>
    </div>
  );
};

export default Navbar;
