# Kraken-Capstone
# Pre-run checklist:
- cardano-node-data volume has config files (see steps to add config files)
- cardano-node-ipc volume is created 
- mongo-data volume is created and data is restored (see steps to restore mongo-data)

# Steps to run:
## kraken-app
    npm install
    
## kraken-server
    npm install

## kraken-capstone
$ docker-compose up -d --build

- wait for node to sync
$ docker run --rm -v cardano-node-ipc:/ipc ubuntu bin/sh -c 'chmod 777 -R /ipc'


# Steps to restore mongo-data
- pull kraken-mongo-backup container from docker hub


# Todo 
- setup mongoose 
- design tables for lookup 

