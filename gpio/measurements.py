#!/usr/bin/env python3
from pigpio_dht import DHT11 
from influxdb import InfluxDBClient
from datetime import datetime
from subprocess import check_output
import time
import sys
import pigpio
import configparser
import psutil

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

def measure_device_stats():
    device_stats = {
        "CPU": {
            "cpu_percent": psutil.cpu_percent(),
            "cpu_freq_max": psutil.cpu_freq().max,
            "cpu_freq_current": psutil.cpu_freq().current
        },
        "RAM": {
            "mem_free": psutil.virtual_memory().free,
            "mem_total": psutil.virtual_memory().total,
            "mem_used": psutil.virtual_memory().used
        },
        "DISK": {
            "disk_percent": psutil.disk_usage("/").percent,
            "disk_total": psutil.disk_usage("/").total,
            "disk_free": psutil.disk_usage("/").free,
            "disk_used": psutil.disk_usage("/").used
        },
        "NET": {
            "net_hostname": check_output(['hostname']).decode(sys.stdout.encoding).strip(),
            "net_ip": check_output(['hostname', '-I']).decode(sys.stdout.encoding).strip()
        }
    }

    return device_stats
    
#get data points and format for influxdb
def get_data_points(time_stamp):
    dht_sensor_value = measure_rack_temp()
    device_stats = measure_device_stats()

    data_points = [
        {
            "measurement": "rack_temp",
            "time": time_stamp,
            "fields": {
                "temp_c": float(dht_sensor_value['temp_c']),
                "temp_f": float(dht_sensor_value['temp_f']),
                "humidity": float(dht_sensor_value['humidity'])
            }
        },
        {
            "measurement": "device_stats",
            "time": time_stamp,
            "fields": {
                "cpu_percent": int(device_stats["CPU"]["cpu_percent"]),
                "cpu_freq_max": int(device_stats["CPU"]["cpu_freq_max"]),
                "cpu_freq_current": int(device_stats["CPU"]["cpu_freq_current"]),
                "mem_free": int(device_stats["RAM"]["mem_free"]),
                "mem_total": int(device_stats["RAM"]["mem_total"]),
                "mem_used": int(device_stats["RAM"]["mem_used"]),
                "disk_percent": int(device_stats["DISK"]["disk_percent"]),
                "disk_total": int(device_stats["DISK"]["disk_total"]),
                "disk_free": int(device_stats["DISK"]["disk_free"]),
                "disk_used": int(device_stats["DISK"]["disk_used"]),
                "net_hostname": device_stats["NET"]["net_hostname"],
                "net_ip": device_stats["NET"]["net_ip"]
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
