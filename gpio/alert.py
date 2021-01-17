#!/usr/bin/env python3
from influxdb import InfluxDBClient
from datetime import datetime
from subprocess import check_output, Popen
import time
import os
import pigpio
import configparser
import psutil

#read settings file
settings = configparser.ConfigParser()
settings.read('settings.ini')

#pigpio instance
pi = pigpio.pi()

#define sampling period
sampling_period = settings['ALERTS']['SamplingPeriod']

#define influxdb
influx_server = settings['INFLUXDB']['Server']
influx_port = settings['INFLUXDB']['Port']
influx_db = settings['INFLUXDB']['Database']
influx_client = InfluxDBClient(host=influx_server, port=influx_port, database=influx_db)

#define LED
led_pin = settings['ALERTS']['LedPin']
led_state = False

def check_alerts():
    temperature = influx_client.query('select last(temp_c) from rack_temp').last
    influx = influx_client.query
    measurements = False

#loop and write data to database
while True:
    temperature = influx_client.query('select last(temp_c) from rack_temp').last
    print(temperature) 
    # if check_alerts():
    #     pi.write(led_pin, 0)
    # else:
    #     pi.write(led_pin, 1)

    # time.sleep(int(sampling_period))
    time.sleep(2)
