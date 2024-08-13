FROM node:latest AS node
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 80
CMD ["node", "./build/src/index.js"]