import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import Plot from 'react-plotly.js';

const RackTempGraph = (props) => {

  const [graphData, setGraphData] = useState(null)

  const graphLayout = {
    title: "Temperature in °C"
  }

  const unpackData = (arr, key) => {
    return arr.map(obj => obj[key])
  }

  const getMeasurements = async () => {
    let fetchData = await fetch("http://localhost:4000/api/temperature/celsius")
      .then(res => res.json());

    setGraphData([
      {
        type: "line",
        mode: "lines",
        x: unpackData(fetchData, "time"),
        y: unpackData(fetchData, "temp_c")

      }
    ])
  }

  useEffect(() => {
    getMeasurements();
    console.log("mounted")
  }, []);

  return (
    <div className="linegraph graph-medium">
      <Plot data={graphData} layout={graphLayout} />
    </div>
  );

};


export default RackTempGraph;
