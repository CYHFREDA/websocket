FROM node:16
WORKDIR /app
COPY package*.json ./
# 安裝所有的依賴
RUN npm install
COPY websocket.js .
CMD ["node", "websocket.js"]