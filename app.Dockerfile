FROM node:18-alpine

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm i
COPY . .
RUN npm run build

EXPOSE 3050

CMD ["npm", "run", "start:prod"]