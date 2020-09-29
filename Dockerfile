FROM node:12

WORKDIR /var/www/week10

COPY . .

RUN yarn install

RUN yarn compile

EXPOSE 5000

CMD yarn start 