FROM postgres:latest

ENV POSTGRES_USER=${DATABASE_USER:-"no"}
ENV POSTGRES_PASSWORD=${DATABASE_PASSWORD:-"no"}
ENV POSTGRES_DB=${DATABASE_NAME:-"no"}

COPY init.sql /docker-entrypoint-initdb.d/

RUN chmod 755 /docker-entrypoint-initdb.d/init.sql

EXPOSE 5432:5432
