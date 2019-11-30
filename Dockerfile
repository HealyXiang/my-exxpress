# VERSION 0.2
# DOCKER-VERSION 0.3.4
# To build:
# 1. Install docker (http://docker.io)
# 2. Checkout source: git@github.com:gasi/docker-node-hello.git
# 3. Build container: docker build .

FROM node:carbon

# Create app directory
RUN mkdir -p /home/app
WORKDIR /home/app

RUN npm install pm2 -g
# RUN npm install babel-cli -g
EXPOSE 3000
CMD ["pm2", "start", "./bin/www", "--watch"]