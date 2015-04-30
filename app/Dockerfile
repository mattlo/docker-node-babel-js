FROM node:0.10

RUN npm install babel -g

WORKDIR /app
ADD . /app

CMD ["babel-node", "app.js"]