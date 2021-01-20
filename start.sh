#!/usr/bin/env bash
set -euo pipefail

# check if database is running
if (systemctl is-active --quiet influxdb)
then
    tput setaf 2; echo "Initializing homelabify..."
else
    tput setaf 1; echo "ERROR: Please start influxdb service"
    exit
fi

# starting python stuff
tput setaf 2; echo "Starting python scripts..."
tput setaf 2; echo "    measurements.py"
python3 gpio/measurements.py &
sleep 5
tput setaf 2; echo "    healthcheck.py"
python3 gpio/healthcheck.py &
sleep 5
tput setaf 2; echo "    alert.py"
python3 gpio/alert.py &

# starting api and frontend
tput setaf 2; echo "Starting api (this could take a while) ..."
yarn --silent --cwd api/ start &

# # starting frontend
# tput setaf 2; echo "Starting frontend..."
# cd frontend && yarn run start  &

