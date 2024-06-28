FROM node:17

WORKDIR  /uapp

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]
