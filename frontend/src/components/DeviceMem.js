import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import Plot from 'react-plotly.js';

const DeviceMemGraph = (props) => {

  const graphLayout = {
    title: "Device | Memory in MB"
  }

  useEffect(() => {
  }, []);

  return (
    <div className="plotwrapper">
      <Plot className="linegraph" data={props.graphData} layout={graphLayout} config={props.config} />
    </div>
  );

};

export default DeviceMemGraph;
