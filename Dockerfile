FROM node:16
WORKDIR /app
COPY websocket.js .
CMD ["node", "websocket.js"]
