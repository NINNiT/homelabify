#!/usr/bin/env bash
set -euo pipefail

tput setaf 3; echo "Killing all services..."
#kill api and frontend
pkill -f index.js &

#kill all python script
pkill -f alert.py &
pkill -f measurements.py &
pkill -f healthcheck.py &


tput setaf 2; echo "Killed"
