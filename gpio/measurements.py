#!/usr/bin/env python3
from pigpio_dht import DHT11 
from influxdb import InfluxDBClient
from datetime import datetime
import time
import pigpio
import configparser

#read settings file
settings = configparser.ConfigParser()
settings.read('settings.ini')

#pigpio instance
pi = pigpio.pi()

#define DHT11
dht_pin = settings['DHT']['DataPin']
dht_timeout_secs = settings['DHT']['TimeoutSecs']
#gpio, timeout_secs=0.5, use_internal_pullup=True, pi=None
dht_sensor = DHT11(int(dht_pin), float(dht_timeout_secs), True, pi) 

#define sampling period
sampling_period = settings['GENERAL']['SamplingPeriod']

#define influxdb
influx_server = settings['INFLUXDB']['Server']
influx_port = settings['INFLUXDB']['Port']
influx_user = settings['INFLUXDB']['User']
influx_pass = settings['INFLUXDB']['Password']
influx_db = settings['INFLUXDB']['Database']
# influx_client = InfluxDBClient(host=influx_server, port=influx_port, username=influx_user, password=influx_pass, database=influx_db)
influx_client = InfluxDBClient(host=influx_server, port=influx_port, database=influx_db)

print(f"Using database <{influx_db}> on <{influx_server}>")
print(f"Current sampling pariod is <{sampling_period} seconds>")

#read DHT sensor values. if result is not valid, retry up to 3 times
def measure_rack_temp():
    raw_value = dht_sensor.read(7)
    return raw_value

#get data points and format for influxdb
def get_data_points(time_stamp):
    sensor_value = measure_rack_temp()

    data_points = [
        {
            "measurement": "rack_temp",
            "time": time_stamp,
            "fields": {
                "temp_c": float(sensor_value['temp_c']),
                "temp_f": float(sensor_value['temp_f']),
                "humidity": float(sensor_value['humidity'])
            }
        }
    ]
    return data_points

#loop and write data to database
while True:
    time_stamp = datetime.utcnow().isoformat()
    data_points = get_data_points(time_stamp)
    influx_client.write_points(data_points)
    print("writing measurements to db...")
    print(data_points)
    time.sleep(int(sampling_period))
