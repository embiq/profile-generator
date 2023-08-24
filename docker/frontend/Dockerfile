FROM node:16-alpine as base-builder

WORKDIR /app/frontend

COPY ./frontend/ /app/

RUN npm cache clean --force
RUN npm install --verbose
RUN npm run build


# for servers deployments
FROM nginx:alpine

WORKDIR /app/frontend

COPY --from=base-builder /app/build /usr/share/nginx/html

COPY ./docker/frontend/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80
