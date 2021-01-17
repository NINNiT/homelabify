
import React, { useState, useEffect } from "react";

const Status = (props) => {

  const [graphData, setGraphData] = useState(null)

  useEffect(() => {
    console.log("mounted")
  }, []);

  return (
    <div className="top-content">
      <div className="top-content-status">status</div>
      <div className="top-content-buttons">buttons</div>
    </div>
  );

};


export default Status;
