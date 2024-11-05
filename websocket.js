const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('客戶端已連接');

    // 設置心跳機制
    let isAlive = true;

    const interval = setInterval(() => {
        if (!isAlive) {
            console.log('客戶端未響應，斷開連接');
            return ws.terminate(); // 直接終止連接
        }

        isAlive = false; // 重置為 false
        ws.send('ping'); // 發送心跳訊息
    }, 30000); // 每30秒發送一次

    ws.on('message', (message) => {
        console.log(`收到訊息：${message}`);
        ws.send(`伺服器回應：${message}`);
    });

    ws.on('pong', () => {
        isAlive = true; // 客戶端響應 pong 訊息，表示連接仍然有效
    });

    ws.on('close', () => {
        clearInterval(interval); // 清除心跳機制
        console.log('客戶端已斷開連接');
    });

    // 傳送一個初始訊息
    ws.send('歡迎來到 WebSocket 服務');
});

console.log('WebSocket 伺服器已啟動，正在監聽 8080 port');
