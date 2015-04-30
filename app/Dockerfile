FROM node:0.10

RUN npm install babel -g

WORKDIR /app
ADD . /app

EXPOSE 3000

CMD ["babel-node", "app.js"]