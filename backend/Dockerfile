FROM node:14.17.0

WORKDIR /app

COPY . /app/

RUN npm install

EXPOSE 5000

ENTRYPOINT [ "node" ]

CMD [ "app.js" ]