import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <div id="navbar" className='row'>
      <Link className='navElem' to="/map">Coverage Map</Link>
      <Link className='navElem' to="/towers">Tower Info</Link>
    </div>
  );
};

export default Navbar;
