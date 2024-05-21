FROM node:14-alpine

WORKDIR /app

COPY package.json ./

RUN npm install \
    && npm cache clean --force \
    && rm -rf /var/cache/apk/*

COPY . .

EXPOSE 3000

CMD ["npm", "start"]