
import React, { useState, useEffect } from "react";

const Status = (props) => {

  const [ip, setIp] = useState(null);
  const [hostname, setHostname] = useState(null);

  const fetchNetworkInfo = async () => {
    let data = await fetch("http://localhost:4000/api/device/net")
      .then(res => res.json());

    setIp(data[0].ip);
    setHostname(data[0].hostname);
  }

  useEffect(() => {
    fetchNetworkInfo();
    const interval = setInterval(() => {
      fetchNetworkInfo();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-content">
      <div className="top-content-status">
        <div>
          <b>IP: </b> {ip}
        </div>
        <div>
          <b>Hostname: </b> {hostname}
        </div>
        <div>
          <b>influxdb: </b> running
        </div>
        <div>
          <b>measurement.py: </b> running
        </div>
        <div>
          <b>alert.py: </b> running
        </div>
      </div>
      <div className="top-content-buttons">buttons</div>
    </div>
  );

};


export default Status;
