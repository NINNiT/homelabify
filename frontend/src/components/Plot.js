import React from "react";
import Plot from 'react-plotly.js';

const CustomPlot = (props) => {

  return (
    <div className="plotwrapper">
      <Plot className="linegraph" data={props.graphData} layout={props.layout} config={props.config} />
    </div>
  );

};

export default CustomPlot;
