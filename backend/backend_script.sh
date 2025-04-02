#install build-essential and python-dev
#apt install build-essential python3.12-dev

#install libpcre3, libpcre3-dev to enable uwsgi work
#apt install libpcre3 libpcre3-dev

#update ubuntu libraries
#apt update

#create and activate a virtual python environment
python3 -m venv .venv/djangodev/

source .venv/djangodev/bin/activate

#start nginx
#sudo systemctl start nginx

#configure nginx proxy for uwsgi
#...


#install python requirements for django app
pip install -r backend/backend_requirements.txt

#start ngrok on port 80
#ngrok http 80

#start uwsgi application through ini file
uwsgi backend/djangoapp.ini