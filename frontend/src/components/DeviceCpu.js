import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import Plot from 'react-plotly.js';

export const DeviceCpuFreqGraph = (props) => {

  const graphLayout = {
    title: "Device | CPU in Mhz"
  }

  useEffect(() => {
  }, []);

  return (
    <div className="plotwrapper">
      <Plot className="linegraph" data={props.graphData} layout={graphLayout} config={props.config} />
    </div>
  );

};

export const DeviceCpuPercGraph = (props) => {

  const graphLayout = {
    title: "Device | CPU in %"
  }

  useEffect(() => {
  }, []);

  return (
    <div className="plotwrapper">
      <Plot className="linegraph" data={props.graphData} layout={graphLayout} config={props.config} />
    </div>
  );

};
