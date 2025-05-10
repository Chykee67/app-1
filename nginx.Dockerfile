FROM nginx:1.28.0

COPY ./nginx.conf /etc/nginx/nginx.conf

VOLUME /staticfiles /mediafiles

EXPOSE 80