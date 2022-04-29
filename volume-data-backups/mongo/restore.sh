#!/bin/bash 

docker volume create mongo-data
docker run -d --name backup-worker -v mongo-data:/data ubuntu bin/bash
cd data
tar -xvf ../data.tar
docker cp . backup-worker:/data/db
docker rm backup-worker 
