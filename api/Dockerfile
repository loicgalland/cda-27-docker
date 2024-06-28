FROM node:17

WORKDIR  /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm uninstall bcrypt && npm install bcrypt


EXPOSE 3306

CMD ["npm", "start"]
