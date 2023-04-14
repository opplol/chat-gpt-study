FROM node:18.12.1-alpine
RUN mkdir gpt-app

RUN apk update && \
    apk add git

WORKDIR /gpt-app
ADD ./gpt-app /gpt-app

RUN npm install
