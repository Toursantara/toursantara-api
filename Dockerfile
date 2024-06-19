FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN ls -la credentials/

COPY package*.json ./

COPY credentials/serviceAccountKey.json ./credentials/serviceAccountKey.json

RUN npm install

COPY . .

ENV PORT=8080

CMD ["npm", "start"] # Before deploy cloud run, make sure remove the credentials on .gitignore