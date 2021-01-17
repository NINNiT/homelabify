var express = require("express");
const path = require('path');
const os = require('os');
const cors = require('cors');
const Influx = require('influx');

const influx = new Influx.InfluxDB("http://192.168.0.21:8086/homelabify");

var app = express(); app.listen(4000, () => {
    console.log("Server running on port 4000");
});

app.use(cors());

app.get("/", (req, res, next) => {
    res.send("Welcome to the homelabify api!")
});

// Get rack-temp values
app.get("/api/temperature/celsius", (req, res, next) => {
    influx.query(`
    select
    mean("temp_c") as "temp_c" from "rack_temp"
    where time > now() - 1h
    group by time(12s)
    order by time desc
    limit 200
    `)
        .then(result => res.json(result))
});

app.get("/api/temperature/fahrenheit", (req, res, next) => {
    influx.query(`
    select
    mean("temp_f") as "temp_f" from "rack_temp"
    where time > now() - 1h
    group by time(10s)
    order by time desc
    limit 200
    `)
        .then(result => res.json(result))
});


app.get("/api/temperature/humidity", (req, res, next) => {
    influx.query(`
    select
    mean("humidity") as "humidity" from "rack_temp"
    where time > now() - 1h
    group by time(10s)
    order by time desc
    limit 200
    `)
        .then(result => res.json(result))
});
