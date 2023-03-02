FROM node:16

WORKDIR /usr/src/dfa-test-case

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production=true && yarn add typescript -g

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=2048" yarn build

EXPOSE 4000

CMD ["yarn", "start"]