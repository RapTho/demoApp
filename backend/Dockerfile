FROM node:14.17.0

WORKDIR /app

COPY . /app/

RUN npm install

EXPOSE 5000

ENV NODE_ENV prod

ENTRYPOINT [ "node" ]

CMD [ "app.js" ]