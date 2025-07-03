FROM node:latest

WORKDIR /app

COPY .dockerignore /app/.dockerignore

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm","run","start" ]
