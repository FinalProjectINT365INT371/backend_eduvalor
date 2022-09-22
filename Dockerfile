FROM node:17-alpine

WORKDIR /eduvalor

COPY package.json yarn.lock /eduvalor/

RUN yarn

RUN apk update && \
    apk add --no-cache tzdata

COPY . .

RUN yarn build

CMD ["yarn", "start"]

