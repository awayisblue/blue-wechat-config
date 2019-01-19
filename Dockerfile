FROM node:8
MAINTAINER awayisblue, awayisblue@qq.com

ADD package.json .
ADD yarn.lock .
# Install dependencies
# RUN yarn --prod
RUN yarn

ADD . .

CMD node src/server.js
