#!/bin/bash 
tar -xzvf data.tar.gz
docker volume create mongo-data
docker run -d --name backup-worker -v mongo-data:/data ubuntu bin/bash
docker cp ./data backup-worker:/data
docker rm backup-worker 
