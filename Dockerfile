FROM node:5.3.0

COPY package.json /vendor/package.json
WORKDIR /vendor

RUN npm install

COPY . /src
WORKDIR /src

RUN mv /vendor/node_modules /src/node_modules

EXPOSE 8080
CMD npm start
