import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCampuses, selectHover,
  setHover, selectDivRefs } from "../slices/campusesSlice";

import { useNavigate } from "react-router-dom";

const classNames = ['campus','campusHide','campusHover']
const infoColors = ['','','rgba(255, 255, 0, .7)' ]
const fontColors = ['','','black']
//setting inline styles to null allows them to revert back to their original class values

let renderCount = 0

const Campuses = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const campusData = useSelector(selectAllCampuses);
  const hoverIndex = useSelector(selectHover);
  const divRefs = useSelector(selectDivRefs) 

  //we need refs to the campus info divs because we need to know
  //the actual positions, since if we highlight a campus on the map
  //we want the highlighted campus info to scroll back into view
  //if it is scrolled out 
  let newDivRefState = []
  for (let i=0; i<100; i++) {
    const newRef = useRef()
    newDivRefState.push(newRef)
  }  

  let campusMapOutput = [];
  let campusDataOutput = [];

  if (campusData.length > 0) {

    const  changeRoute = (event, i) => {
      //reset hoverData  so we we come back nothing is selected
      const hoverData = Array(campusData.length).fill(0)
      dispatch(setHover(hoverData))
      
      navigate('/campuses/'+i)   
      //this is equivalent to static <Link and more
      //straightforward programatically, plus it lets us 
      //make a whole div clickable as href
    }

    function handleMouseOver(event, i, divRefs) {
        //console.log("mouseover:", event, i);
        //only redo the state if we change to a different div or else
        //we get unnecessary renderings by just moving the mouse over the 
        //same div
        //console.log('yyyyyyyyyyyyy',i,hoverIndex)
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
    
    renderCount ++

    for (let i = 0; i < campusData.length; i++) {

      const campus = campusData[i];
      const [x, y] = [campus.xCoord + "%", campus.yCoord + "%"];

      let ii = hoverIndex[i]
      let classToUse = classNames[ii] || 'campus'
      let colorToUse = infoColors[ii] || ''
      let fontColorToUse = fontColors[ii] || ''

      campusMapOutput.push(
        <div
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

    //console.log('zzzzzzzzzzzzz',renderCount,newDivRefState)

  }

  return [
    <div id="map">
      {campusMapOutput}
      <img src="map01.png" alt="Map of Part of NYC"></img>
    </div>,
    <div className='campusContainer'>{campusDataOutput}</div>
  ]
}

export default Campuses