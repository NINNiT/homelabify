var express = require("express");
const path = require("path");
const os = require("os");
const cors = require("cors");
const spawn = require("child_process").spawn;
const Influx = require("influx");

const influx = new Influx.InfluxDB("http://localhost:8086/homelabify");

const port = 3000;

var app = express();
app.listen(port, () => {
  console.log("Server running on port " + port);
});

app.use(cors());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Get rack-temp values
app.get("/api/temperature/celsius", (req, res, next) => {
  influx
    .query(
      `
    select
    mean("temp_c") as "temp_c" from "rack_temp"
    where time > now() - 2h
    group by time(12s)
    order by time desc
    limit 400
    `
    )
    .then((result) => res.json(result));
});

app.get("/api/temperature/fahrenheit", (req, res, next) => {
  influx
    .query(
      `
    select
    mean("temp_f") as "temp_f" from "rack_temp"
    where time > now() - 2h
    group by time(12s)
    order by time desc
    limit 400
    `
    )
    .then((result) => res.json(result));
});

app.get("/api/temperature/humidity", (req, res, next) => {
  influx
    .query(
      `
    select
    mean("humidity") as "humidity" from "rack_temp"
    where time > now() - 2h
    group by time(12s)
    order by time desc
    limit 400
    `
    )
    .then((result) => res.json(result));
});

app.get("/api/device/cpu", (req, res, next) => {
  influx
    .query(
      `
    select
    mean("cpu_freq_current") as "cpu_freq_current",
    mean("cpu_freq_max") as "cpu_freq_max",
    mean("cpu_percent") as "cpu_percent"
    from "device_stats"
    where time > now() - 2h
    group by time(12s)
    order by time desc
    limit 400
    `
    )
    .then((result) => res.json(result));
});

app.get("/api/device/memory", (req, res, next) => {
  influx
    .query(
      `
    select
    mean("mem_free") as "mem_free",
    mean("mem_total") as "mem_total",
    mean("mem_used") as "mem_used"
    from "device_stats"
    where time > now() - 2h
    group by time(12s)
    order by time desc
    limit 400
    `
    )
    .then((result) => res.json(result));
});

app.get("/api/device/memory", (req, res, next) => {
  influx
    .query(
      `
    select
    mean("mem_free") as "mem_free",
    mean("mem_total") as "mem_total",
    mean("mem_used") as "mem_used"
    from "device_stats"
    where time > now() - 2h
    group by time(12s)
    order by time desc
    limit 400
    `
    )
    .then((result) => res.json(result));
});

app.get("/api/device/disk", (req, res, next) => {
  influx
    .query(
      `
    select
    mean("disk_free") as "disk_free",
    mean("disk_total") as "disk_total",
    mean("disk_used") as "disk_used"
    from "device_stats"
    where time > now() - 2h
    group by time(12s)
    order by time desc
    limit 400
    `
    )
    .then((result) => res.json(result));
});

app.get("/api/device/net", (req, res, next) => {
  influx
    .query(
      `
    select
    last("net_hostname") as "hostname",
    last("net_ip") as "ip"
    from "device_stats"
    `
    )
    .then((result) => res.json(result));
});

app.get("/api/healthcheck", (req, res, next) => {
  influx
    .query(
      `
    select
    last("alert") as "alert_status",
    last("measurements") as "measurement_status",
    last("influxdb") as "influxdb_status"
    from "health_check"
    `
    )
    .then((result) => res.json(result));
});

app.get("/api/control/alert", (req, res, next) => {
  const pyProcess = spawn("python3", ["../gpio/toggle.py", "alert"]);
  res.send("toggled");
});

app.get("/api/control/measurement", (req, res, next) => {
  const pyProcess = spawn("python3", ["../gpio/toggle.py", "measurement"]);
  res.send("toggled");
});
