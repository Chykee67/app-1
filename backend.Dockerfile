FROM python:3.13-slim-bookworm

WORKDIR /app

RUN apt update

RUN apt install -y build-essential \
    libpcre3 libpcre3-dev

COPY ./backend /app/backend

RUN mkdir /app/media/

VOLUME /app/media/

RUN pip install -r /app/backend/backend_requirements.txt

EXPOSE 3031

RUN python /app/backend/mybasicapp_graphql/manage.py makemigrations account todo

RUN python /app/backend/mybasicapp_graphql/manage.py migrate

CMD ["uwsgi", "/app/backend/djangoapp.ini"]