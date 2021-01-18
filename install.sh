#!/usr/bin/env bash
set -euo pipefail

# check privileges
if [ $(id -u) != "0" ]; then
echo "You must be superuser to run this script" >&2
exit 1
fi

# update system
apt -y update
apt -y upgrade

# install apt packages
apt -y install python3 python3-pip pigpio python3-pigpio

# install pip packages
