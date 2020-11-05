FROM node:14.5.0-alpine3.12 as build-deps
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
FROM nginx:1.18-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
