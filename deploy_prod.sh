#!/bin/bash

docker ps -a ;
docker images ;
docker-compose -f docker-compose-prod.yml down
docker-compose -f docker-compose-prod.yml up --build -d ;
docker ps -a
docker images ;
docker image prune -f;
docker images ;
