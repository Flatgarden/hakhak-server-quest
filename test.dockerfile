FROM node:14.15.0 as builder

WORKDIR /usr/src/hakhak

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn pretest:e2e && \
    yarn install 

FROM node:14.15.0-alpine3.10 as runner

COPY --from=builder /usr/src/hakhak/node_modules ./node_modules
COPY --from=builder /usr/src/hakhak/package.json ./package.json
COPY --from=builder /usr/src/hakhak/dist-test ./dist-test
COPY --from=builder /usr/src/hakhak/schema.graphql .

EXPOSE 3000