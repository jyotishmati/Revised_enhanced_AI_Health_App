FROM node:22-alpine

RUN addgroup app && adduser -S -G app app
WORKDIR /app
COPY package*.json ./

RUN chown -R app:app /app
USER app

RUN npm install
COPY . . 

EXPOSE 5000

CMD ["npm", "start"]