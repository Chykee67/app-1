#!/usr/bin/env python3

python /app/backend/mybasicapp_graphql/manage.py makemigrations account todo

python /app/backend/mybasicapp_graphql/manage.py migrate

uwsgi /app/backend/djangoapp.ini