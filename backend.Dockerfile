FROM ubuntu:latest

COPY ./backend/mybasicapp /backend/mybasicapp/

COPY ./backend/backend_requirements.txt /backend/

COPY ./backend/backend_script.sh /backend/

COPY ./backend/djangoapp.ini /backend/

WORKDIR /backend

VOLUME /mediafiles /staticfiles

#EXPOSE 3031

ENTRYPOINT ["./backend_script.sh"]