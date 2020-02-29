// 服务端代码

var initWebsocket = function(server) {
    var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer(server);

    // 连接池
    var clients = [];

    wss.on('connection', function(ws) {
        console.log('there is connection');
        // 将该连接加入连接池
        clients.push(ws);
        ws.on('message', function(message) {
            // 广播消息
            // console.log('message', message);
            clients.forEach(function(ws1){
                // if(ws1 !== ws) {
                //     ws1.send(message);
                // }
                ws1.send(message);
        })
        });

        ws.on('close', function(message) {
            // 连接关闭时，将其移出连接池
            clients = clients.filter(function(ws1){
                return ws1 !== ws
            })
        });
    });
    console.log('init socket!');
}

module.exports = initWebsocket;