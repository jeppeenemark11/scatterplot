import { useEffect, useState } from 'react';
import './App.css';
import * as d3 from 'd3';
import data from "./data.js"

function App() {

 const dataSet = data;


  return (
    <div >

      <h1 id="title">Doping in Professional Bicycle Racing</h1>
      <h4>35 Fastest times up Alpe d'Huez</h4>
     <p>No doping allegations: <span style={{ backgroundColor: "green", display: "inline-block", width: "10px", height: "10px", MarginLeft: "5px"}}></span></p>
     <p>Riders with doping allegations: <span style={{ backgroundColor: "red", display: "inline-block", width: "10px", height: "10px", MarginLeft: "5px"}}></span></p>
      <div className='visHolder' >
      <Chart
            data={dataSet}
            height={500} 
            widthOfBar={5} 
            width={800} 
            dataType={"Date"}
            />
      </div>
      
    </div>
);
}

function Chart ({data, height, width, widthOfBar, dataType}){
  useEffect(() => {
createChart();
  }, [data])

const createChart = () => {


  const time = data.map((obj) => {
    const [minutes, seconds] = obj.Time.split(":");
    const totalTimeInSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    return totalTimeInSeconds / 60;
  });

  const year = data.map((obj) => { return obj.Year });
  
  let tooltip = d3.select(".visHolder").append("div").attr("id", "tooltip").style("opacity", 0)


  const bestTime = d3.max(time);
  const lowTime = d3.min(time);
  const highYear = d3.max(year);
  const lowYear = d3.min(year);

  const Yscale = d3.scaleLinear().domain([lowTime, bestTime]).range([height - 40, 40]);
  const Xscale = d3.scaleLinear().domain([lowYear, highYear]).range([40, width - 40]);

  d3.select("svg").attr("id", "toolti").selectAll("circle").data(data).enter().append("circle")
  d3.select("svg").selectAll("circle").data(data).style("fill", (d) => {
    if (d.Doping == "") {
      return "green"
    } else {
      return "red"
    } 
    
  })
  .attr("cx", (d, i) => Xscale(d.Year))
  .attr("cy", (d, i) => height - Yscale(time[i]))
  .attr("r", 5)
  .on("mouseover", (d, i) => {
    tooltip.style("opacity", 0.9);
    tooltip.html("Name: " + data[i].Name + `<br/> Year: ` + data[i].Year + `<br/> Time: ` + data[i].Time + `<br/>` + data[i].Doping)
    .style("left", d3.event.pageX - 200 + "px")
    .style("top", d3.event.pageY - 150 + "px");
  });

};

return (
  <>
  <svg width={width} height={height}> </svg>
  </>
)

}


export default App;

