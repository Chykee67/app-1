FROM python:3.13-slim-bookworm

WORKDIR /app

RUN apt update

RUN apt install -y build-essential \
    libpcre3 libpcre3-dev

COPY ./backend /app/backend

COPY ./backend_entrypoint /app/backend_entrypoint

RUN mkdir /app/media/

VOLUME /app/media/

RUN pip install -r /app/backend/backend_requirements.txt

EXPOSE 3031

CMD ["./app/backend_entrypoint.sh"]