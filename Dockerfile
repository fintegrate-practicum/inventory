FROM node:lts-alpine

WORKDIR /app


COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm", "run","dev" ]
