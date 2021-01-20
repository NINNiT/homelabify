import React, { useState, useEffect } from "react";

const Status = (props) => {
  const [netInfo, setNetInfo] = useState({});
  const [healthCheck, setHealthCheck] = useState({});

  const fetchNetworkInfo = async () => {
    let data = await fetch("/api/device/net").then((res) => res.json());

    setNetInfo({
      ip: data[0].ip,
      hostname: data[0].hostname,
    });
  };

  const fetchHealthCheck = async () => {
    let data = await fetch("/api/healthcheck").then((res) => res.json());

    setHealthCheck({
      influxdb: data[0].influxdb_status,
      measurement: data[0].measurement_status,
      alert: data[0].alert_status,
    });
  };

  const toggleAlert = () => {
    fetch("/api/control/alert");
  };

  const toggleMeasurement = () => {
    fetch("/api/control/measurement");
  };

  useEffect(() => {
    fetchNetworkInfo();
    fetchHealthCheck();
    const interval = setInterval(() => {
      fetchNetworkInfo();
      fetchHealthCheck();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-content">
      <div className="top-content-status">
        <div>
          <b>IP </b> {netInfo.ip}
        </div>
        <div>
          <b>Hostname </b> {netInfo.hostname}
        </div>
        <div>
          <b>influxdb </b>
          <span className={healthCheck.influxdb ? "green" : "red"}>
            {healthCheck.influxdb ? "running" : "not running"}
          </span>
        </div>
        <div>
          <b>measurement.py </b>
          <span className={healthCheck.measurement ? "green" : "red"}>
            {healthCheck.measurement ? "running" : "not running"}
          </span>
        </div>
        <div>
          <b>alert.py </b>
          <span className={healthCheck.alert ? "green" : "red"}>
            {healthCheck.alert ? "running" : "not running"}
          </span>
        </div>
      </div>
      <div className="top-content-buttons">
        <button onClick={toggleAlert}>Toggle Alerts</button>
        <button onClick={toggleMeasurement}>Toggle Measurement</button>
      </div>
    </div>
  );
};

export default Status;
