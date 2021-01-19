#!/usr/bin/env bash
set -euo pipefail

# check if database is running
if (systemctl is-active --quiet influxdb)
then
    tput setaf 2; echo "Initializing homelabify..."
else
    exit
fi

# starting python stuff
tput setaf 2; echo "Starting python scripts..."
python3 gpio/measurements.py & python3 gpio/healthcheck.py & python3 gpio/alert.py &

# starting api
tput setaf 2; echo "Starting api..."
cd api && yarn run start &

# starting frontend
tput setaf 2; echo "Starting frontend..."
cd frontend && yarn run start  &

