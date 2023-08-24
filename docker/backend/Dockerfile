FROM python:3.9-slim-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update \
  # dependencies for building Python packages
  && apt-get install -y build-essential \
  # psycopg2 dependencies
  && apt-get install -y libpq-dev \
  # Translations dependencies
  && apt-get install -y gettext \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

# Requirements
COPY ./backend/requirements.txt /requirements.txt
RUN pip install --no-cache-dir -r /requirements.txt

COPY ./docker/backend/entrypoint.sh /entrypoint.sh
COPY ./docker/backend/backend.sh /backend.sh


WORKDIR /app/backend

ENTRYPOINT ["/entrypoint.sh"]
