import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <div id="navbar" className='row'>
      <span style={{color:"black", fontSize:"1.5em"}}>USIS Cell Phone Towers NYC Area</span>
      <Link className='navElem' to="/usis/map">Coverage Map</Link>
      <Link className='navElem' to="/usis/towers">Tower Links</Link>
    </div>
  );
};

export default Navbar;
