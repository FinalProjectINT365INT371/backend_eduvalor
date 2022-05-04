FROM node:17-alpine

WORKDIR /eduvalor

COPY package.json yarn.lock /eduvalor/

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]

