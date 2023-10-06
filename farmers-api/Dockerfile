FROM node:18.18.0

WORKDIR /farmers-api
COPY package.json .
RUN npm install
COPY . .
CMD npm run dev