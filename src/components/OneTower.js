import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "react-redux";
//import useCounter from "./Counter";
import * as d3 from "d3"

const badTower = 10;

function createSignalBins(index) {
  const start = -130;
  const tmp = [];
  for (let i = 0; i < 15; i++) {
    const z = i - 7;
    const x0 = start + i * 5;
    const x1 = start + (i + 1) * 5;

    let z1 = Math.exp(-z * z / 8);
    if (index === badTower) {
      const zz = Math.log(z+8);
      z1 = Math.exp( -zz*zz/ 2 );
    }
    const length = z1 * (1 + .5 * Math.random());
    tmp.push({ x0, x1, length })
  }
  return tmp;
}

const OneTower = () => {
  const {towerId }= useParams();

  const redux = useStore().getState();
  const divRef = React.useRef();

  //console.log(redux);
  //stupid kluge to get the index of the tower info in the redux state array
  //we would not be doing this in production
  const index = parseFloat(towerId.replace(/t/,'')) - 1;
  const thisTower = redux.campuses.apiData[index];
  
  const signalBins = createSignalBins(index);

  React.useEffect(() => {
    if (divRef.current) {
      ///console.log("zzzzzz", divRef);
      //const svg = divRef.current;

      // set the dimensions and margins of the graph
      const margin = { top: 30, right: 30, bottom: 50, left: 50 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      const svg = d3
        .select(divRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // X axis: scale and draw:
      var x = d3
        .scaleLinear()
        .domain([-140, -50]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, width]);

      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // set the parameters for the histogram
      var histogram = d3
        .histogram()
        .domain(x.domain()) // then the domain of the graphic
        .thresholds(x.ticks(16)); // then the numbers of bins

      // Y axis: scale and draw:
      var y = d3.scaleLinear().range([height, 0]);
      y.domain([
        0,
        d3.max(signalBins, function (d) {
          return d.length;
        }),
      ]); // d3.hist has to be called before the Y axis obviously
      svg.append("g").call(d3.axisLeft(y));

      // Add X axis label:
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + 50)
        .attr("y", height + margin.top + 5)
        .text("Signal Strength (dB)");

      // Y axis label:
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 15)
        .attr("x", -margin.top - 60)
        .text("Count (1e5)");

      // append the bar rectangles to the svg element
      svg
        .selectAll("rect")
        .data(signalBins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function (d) {
          return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function (d) {
          return x(d.x1) - x(d.x0) - 1;
        })
        .attr("height", function (d) {
          return height - y(d.length);
        })
        .style("fill", "#69b3a2");

    }
  }, [signalBins]);

  return(
    <div style={{position:"absolute",top:"80px"}}>
       <div>{JSON.stringify(thisTower)}</div>
       <div>{JSON.stringify(signalBins)}</div> 
       <div style={{marginLeft:"2vw"}} id="signalGraph" ref={divRef} ></div>
       {index===badTower && 
        <div style={{textAlign:"center",backgroundColor:"yellow",color:"red",margin:"2vw", fontSize:"3em"}}>
          Abnormal Signal Distribution - Investigate
        </div> }
    </div>

  )
}

export default OneTower;