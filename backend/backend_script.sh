#!/bin/bash

apt update
#apt upgrade -y

#install build-essential and python-dev
apt install build-essential python3.12-dev -y

#install libpcre3, libpcre3-dev to enable uwsgi work
apt install libpcre3 libpcre3-dev python3 python3.12-venv -y

#update ubuntu libraries
#apt update

#create and activate a virtual python environment
python3 -m venv .venv/djangodev/

#python -m venv .venv/djangodev/

source .venv/djangodev/bin/activate

#start nginx
#sudo systemctl start nginx

#configure nginx proxy for uwsgi


#install python requirements for django app
pip install -r /backend/backend_requirements.txt

#start ngrok on port 80
#ngrok http 80

python /backend/mybasicapp/manage.py makemigrations todo user_account user_auth

python /backend/mybasicapp/manage.py migrate

python /backend/mybasicapp/manage.py collectstatic --noinput

#start uwsgi application through ini file
uwsgi /backend/djangoapp.ini