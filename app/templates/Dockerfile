FROM node:0.12

RUN useradd -ms /bin/bash node
ADD . /home/node/src
RUN chown -R node:node /home/node

USER node
ENV HOME /home/node

WORKDIR /home/node/src

RUN npm install && npm install nodemon@1.3.7

EXPOSE <%= port %>

CMD ["node", "node_modules/nodemon/bin/nodemon.js", "index.js"]
