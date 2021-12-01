FROM node:lts-alpine AS web-ui

### arg from docker compose
# custom_env = dev | qa | uat | prod
ARG custom_env


# Install dependencies
RUN npm config set loglevel info

RUN apk update
RUN apk add git 

RUN mkdir -p /app/builder
WORKDIR /app/builder
COPY package.json .
# COPY package-lock.json .
RUN npm install

COPY . .

RUN npm run build

###### nginx image run
FROM nginx:stable-alpine

ARG custom_env

# # Replace default.conf configuration to remove unnecessary rules
RUN sed -i "s/}/application\/wasm wasm;\n}/g" /etc/nginx/mime.types
COPY proxy/conf/${custom_env}_env/site.conf /etc/nginx/conf.d/default.conf

COPY --from=web-ui /app/builder/build /usr/share/nginx/html/
