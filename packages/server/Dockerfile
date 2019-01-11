FROM node:latest

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Apollo Presentation API Validator Server"

WORKDIR /srv/apav
RUN git clone https://github.com/ubl-chj/apollo-presentation-api.git ./
RUN npm i npm@latest -g
WORKDIR /srv/apav/packages/server
RUN npm install
RUN npm run build

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 4000

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "lib/index.js" ]
