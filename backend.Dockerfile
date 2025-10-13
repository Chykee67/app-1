FROM python:3.13-slim-bookworm

WORKDIR /app

RUN apt update

RUN apt install -y build-essential \
    libpcre3 libpcre3-dev

COPY ./backend /app/backend

COPY ./backend_entrypoint.sh /app/backend_entrypoint.sh

RUN mkdir /app/media/

VOLUME /app/media/

RUN pip install -r /app/backend/backend_requirements.txt

COPY ./response.py /usr/local/lib/python3.13/site-packages/django/http/response.py

COPY ./utils.py /usr/local/lib/python3.13/site-packages/graphql_jwt/utils.py

COPY ./cookies.py /usr/local/lib/python3.13/http/cookies.py

EXPOSE 3031

CMD ["/app/backend_entrypoint.sh"]