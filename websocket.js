const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = []; // 用於存儲所有連接的客戶端

wss.on('connection', (ws) => {
    console.log('客戶端已連接');
    clients.push(ws); // 將新客戶端添加到列表中

    // 當接收到客戶端的訊息
    ws.on('message', (message) => {
        console.log(`收到訊息：${message}`);
        // 將消息廣播給所有已連接的客戶端
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('客戶端已斷開連接');
        // 移除斷開連接的客戶端
        clients = clients.filter(client => client !== ws);
    });

    // 傳送一個初始訊息
    ws.send('歡迎來到聊天室！');
});

console.log('WebSocket 伺服器已啟動，正在監聽 8080 port');
