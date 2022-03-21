FROM inputoutput/cardano-rosetta:1.7.0-testnet
WORKDIR /kraken-app

COPY ./package*.json ./

ENV PATH /app/node-modules/.bin:$PATH

RUN npm install 
ENTRYPOINT ["bash","entrypoint.sh"]
