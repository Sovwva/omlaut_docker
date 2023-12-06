FROM postgres:latest

COPY init.sql /docker-entrypoint-initdb.d
# COPY ./my-custom-postgresql.conf /etc/postgresql/postgresql.conf

# On making image
# RUN

# On making kontainer
# ENTRYPOINT ["comand"]
#CMD ["argument]

#CMD ["comand", "argument"]
ENV POSTGRES_USER=omlaut_docker_database_user
ENV POSTGRES_PASSWORD=omlaut_docker_database_password
ENV POSTGRES_DB=omlaut_docker_database

EXPOSE 5432

# COPY ./init-scripts /docker-entrypoint-initdb.d/



CMD ["postgres"]
