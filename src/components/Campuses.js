import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCampuses, selectHover,
  setHover, selectDivRefs } from "../slices/campusesSlice";

import { useNavigate } from "react-router-dom";
import useCounter from "./Counter";

const classNames = ['campus','campusHide','campusHover']
const infoColors = ['','','rgba(255, 255, 0, .7)' ]
const fontColors = ['','','black']
//setting inline styles to null allows them to revert back to their original class values

const useRefs = () => {
  const tmp = [];
  for (let i=0; i<100; i++) {
    const colorRef = useRef();
    tmp.push(colorRef);
  }
  return tmp;
}

const badTower = 10;

const Campuses = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const campusData = useSelector(selectAllCampuses);
  const hoverIndex = useSelector(selectHover);
  const divRefs = useSelector(selectDivRefs) 

  const counter = useCounter();
  
  //we need refs to the campus info divs because we need to know
  //the actual positions, since if we highlight a campus on the map
  //we want the highlighted campus info to scroll back into view
  //if it is scrolled out 
  const newDivRefState = useRefs();
  const colorRefs = useRefs();

  let campusMapOutput = [];
  let campusDataOutput = [];

  React.useEffect( ()=>{
    let ii = hoverIndex[badTower]
    const color = ii !==1 ? counter%2 : 2;
    const color2 = counter%2;

    let colors = ["rgba(255,0,0,.5)","rgba(255,0,0,1)","rgba(0,0,0,0)"];
 
    if  (colorRefs[badTower].current) {
      colorRefs[badTower].current.style.backgroundColor = colors[color];
      newDivRefState[badTower].current.style.backgroundColor = colors[color2];
    }
  },[colorRefs,counter,hoverIndex,newDivRefState])

  if (campusData.length > 0) {

    const  changeRoute = (event, i) => {
      //reset hoverData  so we we come back nothing is selected
      const hoverData = Array(campusData.length).fill(0)
      dispatch(setHover(hoverData))
      
      navigate('/towers/'+i)   
      //this is equivalent to static <Link and more
      //straightforward programatically, plus it lets us 
      //make a whole div clickable as href
    }

    function handleMouseOver(event, i, divRefs) {
        if ( hoverIndex.length >= i && hoverIndex[i] !== 2) { 
          //console.log('ttttt',i,window.innerHeight,
          //  newDivRefState[i].current.getBoundingClientRect())
          const divPos = newDivRefState[i].current.getBoundingClientRect().top

          if ( divPos < 200) window.scrollTo(window.innerWidth,0)
          else if ( divPos > window.innerHeight) window.scrollTo(window.innerWidth,window.innerHeight)
          
          let hoverData = Array(campusData.length).fill(1)
          hoverData[i]=2;
          dispatch(setHover(hoverData));
        }
      
    }
    
    function handleMouseOut(event, i) {
        //console.log('mouse out, mouse out')
        let hoverData = Array(campusData.length).fill(0)
        dispatch(setHover(hoverData));
    }
    
    for (let i = 0; i < campusData.length; i++) {

      const campus = campusData[i];
      const [x, y] = [campus.xCoord + "%", campus.yCoord + "%"];

      let ii = hoverIndex[i]
      let classToUse = classNames[ii] || 'campus'
      let colorToUse = infoColors[ii] || ''
      let fontColorToUse = fontColors[ii] || ''

      campusMapOutput.push(
        <div
          ref={colorRefs[i]}
          key={'campus'+campus.id}
          id={campus.id}
          className={classToUse}
          onMouseOver={(event) => {
            handleMouseOver(event, i);
          }}
          onMouseOut={(event) => {
            handleMouseOut(event, i);
          }}
          onClick={(event)=> {changeRoute(event,campus.id) } }
          style={{ textAlign:"center", position: "absolute", left: `${x}`, top: `${y}` }}
        >{campus.id}</div>
      );

      campusDataOutput.push(
        <div
          ref={newDivRefState[i]}
          key={campus.id}
          className="campusInfo"
          style={{backgroundColor:colorToUse,
            color:fontColorToUse}}
          onMouseOver={(event) => {
            handleMouseOver(event, i, divRefs);
          }}
          onMouseLeave={(event) => {
            handleMouseOut(event, i);
          }}
          onClick={(event)=> {changeRoute(event,campus.id) } }
        >
          <h2>{campus.name}</h2>
          <p>{campus.type}</p>
          <footer>Location: {campus.xCoord.toString() + "," + campus.yCoord.toString()} </footer>
          
        </div>
      );
    }


  }

  return [
    <div key="mainMap" id="map">
      {campusMapOutput}
      <img src="map01.png" alt="Map of Part of NYC"></img>
    </div>,
    <div key="mainInfo" className='campusContainer'>{campusDataOutput}</div>
  ]
}

export default Campuses