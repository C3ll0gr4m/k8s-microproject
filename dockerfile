FROM ubuntu:latest

RUN apt-get update && apt-get install -y nodejs npm

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
