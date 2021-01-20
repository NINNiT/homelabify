#!/usr/bin/env python3
import subprocess
import os
import sys
import pigpio
import configparser
import psutil

folder = os.path.dirname(__file__)

#read settings file
settings = configparser.ConfigParser()
settings.read(os.path.join(folder, 'settings.ini'))

#pigpio instance
pi = pigpio.pi()

#get argument
arg = sys.argv[1]

#define LED
led_pin = settings['ALERTS']['LedPin']

def check_alert():
    return os.path.exists(os.path.join(folder, '.pid/alert.pid'))

def check_measurements():
    return os.path.exists(os.path.join(folder, '.pid/measurements.pid'))

if arg == "alert":
    if check_alert():
        pi.write(int(led_pin), 0)
        os.system("pkill -f alert.py")
    else:
        subprocess.Popen(os.path.join(folder, 'alert.py'))
elif arg == "measurement":
    if check_measurements():
        os.system("pkill -f measurements.py")
    else:
        subprocess.Popen(os.path.join(folder, 'measurements.py'))

