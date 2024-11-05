const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('客戶端已連接');

    // 當接收到客戶端的訊息
    ws.on('message', (message) => {
        console.log(`收到訊息：${message}`);
        ws.send(`伺服器回應：${message}`);
    });

    // 傳送一個初始訊息
    ws.send('歡迎來到 WebSocket 服務');
});

console.log('WebSocket 伺服器已啟動，正在監聽 8080 port');
