import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.scss';
import CustomPlot from "./components/Plot";
import Status from "./components/Status";

function App() {

  const [rackTempData, setRackTempData] = useState(null)
  const [rackHumData, setRackHumData] = useState(null)
  const [deviceCpuFreqData, setDeviceCpuFreqData] = useState(null)
  const [deviceCpuPercData, setDeviceCpuPercData] = useState(null)
  const [deviceMemData, setDeviceMemData] = useState(null)
  const [deviceDiskData, setDeviceDiskData] = useState(null)

  const fetchMeasurements = async () => {
    const [rackTemp, rackHum, deviceCpu, deviceMem, deviceDisk] = await Promise.all([
      fetch("http://localhost:4000/api/temperature/celsius").then(res => res.json()),
      fetch("http://localhost:4000/api/temperature/humidity").then(res => res.json()),
      fetch("http://localhost:4000/api/device/cpu").then(res => res.json()),
      fetch("http://localhost:4000/api/device/memory").then(res => res.json()),
      fetch("http://localhost:4000/api/device/disk").then(res => res.json())
    ]);

    setRackTempData(dataToPlot("bar", rackTemp, ["temp_c"]));
    setRackHumData(dataToPlot("bar", rackHum, ["humidity"]));
    setDeviceCpuFreqData(dataToPlot("bar", deviceCpu, ["cpu_freq_current"]));
    setDeviceCpuPercData(dataToPlot("bar", deviceCpu, ["cpu_percent"]));
    setDeviceMemData(dataToPlot("line", deviceMem, ["mem_free", "mem_used"]));
    setDeviceDiskData(dataToPlot("line", deviceDisk, ["disk_free", "disk_used"]));
  }

  const dataToPlot = (type, data, values) => {
    let plotData = []
    switch (values.length) {
      case 1:
        plotData = [{
          type: type,
          y: unpackData(data, values[0]),
          x: unpackData(data, "time")
        }];

        break;
      case 2:
        plotData = [
          {
            type: type,
            name: values[0],
            y: unpackData(data, values[0]),
            x: unpackData(data, "time")
          },
          {
            type: type,
            name: values[1],
            y: unpackData(data, values[1]),
            x: unpackData(data, "time")
          },
        ];
        break;
      case 3:
        break;
    }
    return plotData;
  }

  const unpackData = (arr, key) => {
    return arr.map(obj => obj[key])
  }

  useEffect(() => {
    fetchMeasurements();
    const interval = setInterval(() => {
      fetchMeasurements();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const graphConfig = {
    scrollZoom: true
  }

  const graphLayout = {

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Homelabify</h1>
      </header>
      <Status />
      <section className="bottom-content">
        <CustomPlot layout={{ title: "Rack | Temperature in °C" }} graphData={rackTempData} config={graphConfig} />
        <CustomPlot layout={{ title: "Rack | Humidity in %" }} graphData={rackHumData} config={graphConfig} />
        <CustomPlot layout={{ title: "Device | CPU Frequency in Mhz" }} graphData={deviceCpuFreqData} config={graphConfig} />
        <CustomPlot layout={{ title: "Device | CPU Load in %" }} graphData={deviceCpuPercData} config={graphConfig} />
        <CustomPlot layout={{ title: "Device | Memory in MB" }} graphData={deviceMemData} config={graphConfig} />
        <CustomPlot layout={{ title: "Device | Disk in Byte" }} graphData={deviceDiskData} config={graphConfig} />
      </section>
    </div>
  );
}

export default App;
