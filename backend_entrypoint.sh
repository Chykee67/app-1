#!/bin/bash

uv run /app/backend/mybasicapp_graphql/manage.py makemigrations account todo

uv run /app/backend/mybasicapp_graphql/manage.py migrate

uv run uwsgi /app/backend/djangoapp.ini