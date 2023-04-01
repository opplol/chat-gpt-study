FROM node:18.12.1-alpine
WORKDIR /usr/src/app

RUN apk update && \
    apk add git
