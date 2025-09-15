FROM python:3.13-slim-bookworm

RUN apt update && apt install -y nginx build-essential

WORKDIR /app

COPY /backend/backend_requirements.txt /app/backend/backend_requirements.txt

RUN pip install -r /app/backend/backend_requirements.txt

COPY /backend/mybasicapp_graphql /app/backend/mybasicapp_graphql

EXPOSE 8000

CMD ["python", "/app/backend/mybasicapp_graphql/manage.py", "runserver", "0.0.0.0:8000"]