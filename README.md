# Kraken-Capstone
## Pre-run checklist:
- nami wallet extension is installed on browser 
- Docker is installed 
- volume-data-backups/cardano-node/restore.sh is ran successfuly 
- volume-data-backups/mongo/restore.sh is ran successfully

## Steps to run:
### 1.) In the kraken-app folder
    $ npm install
    
### 2.) in the kraken-server folder
    $ npm install

### 3.) in the kraken-capstone folder (outermost)
    $ docker-compose up -d --build

### 4.) wait for node to sync - this can take up to 12 hours the first time!!
    # query for checking status output will have a syncProgress attribute
    $ cardano-cli query tip --testnet-magic 1097911063
### 5.) After sync is complete run the following in any folder 
    $ docker run --rm -v cardano-node-ipc:/ipc ubuntu bin/sh -c 'chmod 777 -R /ipc'

### 6.) App is now running on http://localhost:3002/


