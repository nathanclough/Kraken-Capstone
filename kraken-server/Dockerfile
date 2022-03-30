FROM node:16-alpine 
USER root
WORKDIR ../
RUN apk update
RUN apk add curl
RUN curl https://hydra.iohk.io/build/9116140/download/1/cardano-node-1.32.1-linux.tar.gz --output cardano.tar.gz
RUN tar -xvzf cardano.tar.gz
RUN mv cardano-cli usr/bin

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

RUN npm install 
COPY . .


