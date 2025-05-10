FROM ubuntu:latest

COPY ./backend/mybasicapp /backend/mybasicapp/

COPY ./backend/backend_requirements.txt /backend/

COPY ./backend/backend_script.sh /backend/

COPY ./backend/djangoapp.ini /backend/

WORKDIR /backend

VOLUME /mediafiles /staticfiles

ENTRYPOINT ["./backend_script.sh"]