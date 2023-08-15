const {Server} = require ('socket.io');
const {createServer} = require('http');
const getRandomPlace = require('./resources/places');
const port = process.env.PORT || 8080;

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

io.on("connection", (socket) => {
    const initData = getRandomPlace();
    console.log('connected well', initData );
    socket.emit('init', initData);
    socket.on('move', m => {
        socket.broadcast.emit('enemy-move', m);
    })
})

httpServer.listen(port);