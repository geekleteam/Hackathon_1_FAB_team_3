FROM node:18-alpine

WORKDIR /app/frontend

COPY frontend-web/package*.json .

RUN npm install

COPY frontend-web .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
