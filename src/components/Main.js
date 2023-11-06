
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./navbar";
import Map from "./Map";
import Campuses from "./Campuses";
import OneTower from "./OneTower";

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
        <Route path='/towers' element={<Campuses />} />
        <Route path='/*' element={<Campuses />} />
        <Route path="/towers/:towerId" element={<OneTower />} />
      </Routes>
    </div>
  );
};

export default Main;
