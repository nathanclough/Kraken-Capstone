#!/bin/bash 
docker volume create cardano-node-ipc
docker volume create cardano-node-data
docker run -d --name backup-worker -v cardano-node-data:/data ubuntu bin/bash
docker cp ./config backup-worker:/data
docker rm backup-worker 
