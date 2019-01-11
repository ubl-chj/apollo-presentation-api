FROM node:latest

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Apollo Presentation API Validator Client"

WORKDIR /srv/apav
RUN git clone https://github.com/ubl-chj/apollo-presentation-api.git ./
COPY .env packages/client/.env
##Install
RUN npm i npm@latest -g
WORKDIR /srv/apav/packages/client
RUN npm install
RUN npm run build
RUN yarn global add serve

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 5000

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-s", "build" ]
