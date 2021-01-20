#!/usr/bin/env bash
set -euo pipefail

#kill api and frontend
pkill -f index.js

#kill all python script
pkill -f alert.py
pkill -f measurements.py
pkill -f healthcheck.py

