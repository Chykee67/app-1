FROM django-nginx:v1

WORKDIR /app

RUN apt update && apt install -y net-tools

RUN pip install beautifulsoup4

CMD ["python", "/app/backend/mybasicapp_graphql/manage.py", "runserver", "0.0.0.0:8000"]