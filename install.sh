#!/usr/bin/env bash
set -euo pipefail

# check privileges
if [ $(id -u) != "0" ]; then
echo "You must be superuser to run this script" >&2
exit 1
fi

# update system
tput setaf 2; echo "updating/upgrading OS..."
apt -y update
apt -y upgrade

# install influxdb and start service
tput setaf 2; echo "installing influxdb and starting service..."
curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/os-release
test $VERSION_ID = "7" && echo "deb https://repos.influxdata.com/debian wheezy stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
test $VERSION_ID = "8" && echo "deb https://repos.influxdata.com/debian jessie stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
apt -y update
apt -y install influxdb
systemctl start influxdb && systemctl enable influxdb

# install yarn
tput setaf 2; echo "installing yarn..."
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt -y update
apt -y install yarn

# install other apt packages
tput setaf 2; echo "installing apt packages..."
apt -y install python3 python3-pip pigpio python3-pigpio nodejs

# install pip packages
tput setaf 2; echo "installing python (pip) packages..."
pip3 install influxdb pid configparser psutil pigpio-dht statistics

tput setaf 2; echo "INSTALLATION FINISHED"

# yarn install on api and frontend
cd api && yarn install
cd .. && cd frontend && yarn install
