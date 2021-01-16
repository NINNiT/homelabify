#!/usr/bin/env python3
import configparser
from influxdb import InfluxDBClient

settings = configparser.ConfigParser()
settings.read('settings.ini')

influx_server = settings['INFLUXDB']['Server']
influx_port = settings['INFLUXDB']['Port']
influx_user = settings['INFLUXDB']['User']
influx_pass = settings['INFLUXDB']['Password']
influx_db = settings['INFLUXDB']['Database']

influx_client = InfluxDBClient(influx_server, influx_port)

print('creating database: ' + influx_db)
influx_client.create_database(influx_db)
print('creating user: ' + influx_user)
influx_client.create_user(username=influx_user, password=influx_pass)
