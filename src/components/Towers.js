import React from "react";

export default function Towers() {

  const aspect = window.innerWidth / window.innerHeight;
  const baseWidth = 40;
  const baseHeight = baseWidth;

  const towerOutput = [];
  const towerPos = [[60,5],[10,1],[30,25],[32,29],[70,25],[20,40],[35,55],[50,55],[60,80],[50,50],[56,50]];

  for (const pos of towerPos) {

    const thisStyle = {
      position: "absolute",
      backgroundColor: "rgba(255,20,0,.4)",
      borderRadius: "50%",
      width: baseWidth + "px",
      height: baseHeight + "px",
      transform: "translate(66%,66%)"
    }
    thisStyle.top = pos[1] + "%";
    thisStyle.left = pos[0] + "%";

    const keyVal = pos[1].toString() + pos[0].toString();

    //console.log(towerAttribs);
    towerOutput.push( <div key={"tower"+keyVal} style={thisStyle}></div>)

    const outerStyle = {
      position: "absolute",
      borderRadius: "50%",
      width: baseWidth*6 + "px",
      height: baseHeight*6 + "px",
      backgroundColor: "rgba(0,0,255,.2)",
      transform: "translate(-32%,-28%)"
    }

    outerStyle.top = pos[1] + "%"
    outerStyle.left = pos[0] + "%";

    towerOutput.push( <div key={"maxDistance"+keyVal} style={outerStyle}></div> );
    
  }
  return ( towerOutput )
}
