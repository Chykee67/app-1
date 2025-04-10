FROM ubuntu:latest

WORKDIR /app

COPY . .

CMD ["./backend_script.sh"]