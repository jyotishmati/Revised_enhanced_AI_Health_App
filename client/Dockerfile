
FROM node:22-alpine

RUN addgroup -S app && adduser -S -G app app

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chown -R app:app /app

USER app

EXPOSE 8081 19000 19001 19002 19006

CMD ["npx", "expo", "start", "--tunnel"]
