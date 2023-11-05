
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./navbar";
import Map from "./Map";
import Campuses from "./Campuses";

const Nothing = () => {
  return ( <div>nothing</div> );
}

const Main = () => {

  return (
    <div >
      <Navbar key='navbar'/>
      <Routes>
        <Route path='/nothing' element={<Nothing />} />
        <Route path='/map' element={<Map />} />
        <Route path='/campuses' element={<Campuses />} />
        <Route path='/*' element={<Nothing />} />
      </Routes>
    </div>
  );
};

export default Main;
