FROM node:16-alpine

WORKDIR /app

COPY . .

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npx", "serve", "." ]