import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import Plot from 'react-plotly.js';

const RackHumGraph = (props) => {

  const graphLayout = {
    title: "Server Rack | Humidity in %"
  }

  useEffect(() => {
  }, []);

  return (
    <div className="plotwrapper">
      <Plot className="linegraph" data={props.graphData} layout={graphLayout} config={props.config} />
    </div>
  );

};


export default RackHumGraph;
