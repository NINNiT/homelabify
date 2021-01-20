#!/usr/bin/env python3
import pigpio
from RPLCD.pigpio import CharLCD
from pid import PidFile
from influxdb import InfluxDBClient
import os
import configparser

folder = os.path.dirname(__file__)

with PidFile('lcd', piddir=os.path.join(folder, '.pid/')) as p:

    #read settings file
    settings = configparser.ConfigParser()
    settings.read(os.path.join(folder, 'settings.ini'))

    #pigpio instance
    pi = pigpio.pi()

    #define sampling period
    sampling_period = settings['ALERTS']['SamplingPeriod']

    #define influxdb
    influx_server = settings['INFLUXDB']['Server']
    influx_port = settings['INFLUXDB']['Port']
    influx_db = settings['INFLUXDB']['Database']
    influx_client = InfluxDBClient(host=influx_server, port=influx_port, database=influx_db)

    #define lcd
    lcd = CharLCD(pi,
                pin_rs=4, pin_rw=18, pin_e=17, pins_data=[26, 19, 13, 6],
                cols=12, rows=2, dotsize=8,
                charmap='A02',
                auto_linebreaks=True)

    lcd.write_string("test")
