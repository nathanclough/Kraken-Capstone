FROM inputoutput/cardano-rosetta
WORKDIR /kraken-app

COPY ./package*.json ./

ENV PATH /app/node-modules/.bin:$PATH

RUN npm install 
