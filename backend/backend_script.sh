#install build-essential and python-dev
#sudo apt install build-essential python3.12-dev

#update ubuntu registries
#sudo apt update

#install and setup python environment
python3 -m venv .venv/djangodev/
source .venv/djangodev/bin/activate

#start nginx
#sudo systemctl start nginx

#install python requirements for django app
pip install backend/backend_requirements.txt

#start uwsgi application through ini file
uwsgi backend/djangoapp.ini