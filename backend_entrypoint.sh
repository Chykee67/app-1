#!/bin/bash

python3 /app/backend/mybasicapp_graphql/manage.py makemigrations account todo

python3 /app/backend/mybasicapp_graphql/manage.py migrate

uwsgi /app/backend/djangoapp.ini