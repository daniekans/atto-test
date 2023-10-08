FROM node:lts

WORKDIR /farmers-api
COPY package.json .
RUN npm install
COPY . .
CMD npm run dev