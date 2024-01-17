FROM postgres:latest

ENV POSTGRES_USER=omlaut_docker_database_user
ENV POSTGRES_PASSWORD=omlaut_docker_database_password
ENV POSTGRES_DB=omlaut_docker_database

COPY init.sql /docker-entrypoint-initdb.d/

RUN chmod 755 /docker-entrypoint-initdb.d/init.sql

EXPOSE 5432:5432
