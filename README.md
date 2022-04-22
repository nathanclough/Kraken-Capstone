# Kraken-Capstone
# Pre-run checklist:
- cardano-node-data volume has config files (see steps to add config files)
- cardano-node-ipc volume is created 
- volume-data-backups/mongo/resture.sh is ran successfully

# Steps to run:
## kraken-app
    npm install
    
## kraken-server
    npm install

## kraken-capstone
$ docker-compose up -d --build

- wait for node to sync
$ docker run --rm -v cardano-node-ipc:/ipc ubuntu bin/sh -c 'chmod 777 -R /ipc'

# Todo 
- setup mongoose 
- design tables for lookup 

