FROM node:18-alpine

WORKDIR /app

COPY /server/package.json /app

RUN npm install

COPY /server /app

EXPOSE 5000

CMD ["npm","start"]
