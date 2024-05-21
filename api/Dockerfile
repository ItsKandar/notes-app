FROM node:14-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4000

# npx json-server@0.17.4 --watch db.json --port 4000
CMD ["npx", "json-server@0.17.4", "--watch", "db.json", "--port", "4000"]