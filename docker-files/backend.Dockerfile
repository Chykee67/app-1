FROM python:3.13-slim-bookworm

#WORKDIR /app

RUN apt update

RUN apt install -y --no-install-recommends build-essential \
    libpcre3 libpcre3-dev curl ca-certificates

ADD https://astral.sh/uv/0.9.2/install.sh /uv-installer.sh

RUN sh /uv-installer.sh && rm /uv-installer.sh

ENV PATH="/root/.local/bin/:$PATH"

COPY ../backend /app/backend

WORKDIR /app/backend

RUN uv sync --locked

COPY ./backend_entrypoint.sh /app/backend_entrypoint.sh

COPY ./response.py /usr/local/lib/python3.13/site-packages/django/http/response.py

COPY ./utils.py /usr/local/lib/python3.13/site-packages/graphql_jwt/utils.py

COPY ../cookies.py /usr/local/lib/python3.13/http/cookies.py

RUN mkdir /app/media/

RUN mkdir /app/static/

VOLUME /app/media/

VOLUME /app/static/

EXPOSE 3031

CMD ["/app/backend_entrypoint.sh"]