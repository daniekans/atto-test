FROM node:lts as build

WORKDIR /farmers-api
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --quiet
COPY --chown=node:node . .
RUN npm run ng build -- --configuration development

FROM nginx:latest

COPY --from=build /farmers-api/dist/farmers-web /usr/share/nginx/html
EXPOSE 80
