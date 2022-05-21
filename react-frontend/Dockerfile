# stage 1
FROM node:16.13.0 AS buildfrontend

WORKDIR /react-frontend

ENV PATH /react-frontend/node_modules/.bin:$PATH
COPY ./react-frontend/package*.json ./
RUN npm install 

# add app
COPY ./react-frontend ./
RUN npm run build

# start app
# Stage 2 - the production environment
FROM nginx:alpine
COPY --from=buildfrontend /react-frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./react-frontend/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
