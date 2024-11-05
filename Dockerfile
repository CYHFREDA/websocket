FROM node:16
WORKDIR /app
COPY server.js .
CMD ["node", "server.js"]
