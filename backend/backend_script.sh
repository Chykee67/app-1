#install build-essential and python-dev
#sudo apt install build-essential python3.12-dev

#update ubuntu registries
#sudo apt update

#install and setup python environment
python3 -m venv .venv/djangodev/

echo 'environment created'

source .venv/djangodev/bin/activate

#start nginx
#sudo systemctl start nginx

#install python requirements for django app
pip install -r backend/backend_requirements.txt

#start uwsgi application through ini file
pip uninstall uwsgi

sudo apt -S install libpcre3 libpcre3-dev

pip install uwsgi -I --no-cache-dir

uwsgi backend/djangoapp.ini