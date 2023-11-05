import React from "react";

export default function Towers() {

  const aspect = window.innerWidth / window.innerHeight;
  const baseWidth = 40;
  const baseHeight = baseWidth;

  const towerOutput = [];
  const towerPos = [[60,5],[20,1],[40,25],[42,29],[70,25],[20,40],[35,55],[70,55],[60,80],[80,50],[86,50]];

  for (const pos of towerPos) {

    const thisStyle = {
      position: "absolute",
      backgroundColor: "rgba(255,20,0,.5)",
      borderRadius: "50%",
      width: baseWidth + "px",
      height: baseHeight + "px",
      transform: "translate(-50%,-50%)"
    }
    thisStyle.top = pos[0] + "%";
    thisStyle.left = pos[1] + "%";

    const keyVal = pos[0].toString() + pos[1].toString();

    //console.log(towerAttribs);
    towerOutput.push( <div key={"tower"+keyVal} style={thisStyle}></div>)

    const outerStyle = {
      position: "absolute",
      borderRadius: "50%",
      width: baseWidth*5 + "px",
      height: baseHeight*5 + "px",
      transform: "translate(-50%,-50%)",
      backgroundColor: "rgba(0,0,255,.2)"
    }
    outerStyle.left = pos[1] + "%";
    outerStyle.top = pos[0] + "%"

    towerOutput.push( <div key={"maxDistance"+keyVal} style={outerStyle}></div> );
    
  }
  return ( towerOutput )
}
