#!/bin/bash

docker ps -a ;
docker images ;
docker-compose down ;
docker-compose up --build -d ;
docker ps -a
docker images ;
docker image prune -f;
docker images ;
