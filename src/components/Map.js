import React from "react";
import Towers from "./Towers"

const Map = () => {

  const MapOutput = [];
  const DataOutput = [];

  
  return (
     [
      <div key="mainMap" id="map">
        {MapOutput}
        <img src="map01.png" alt="Map of NYC 01"></img>
        <Towers />
      </div>,
      <div key="infoDisplay" className='campusContainer'>{DataOutput}</div>
    ]
  )
  

}

export default Map;