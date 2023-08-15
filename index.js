const {Server} = require ('socket.io');
const {createServer} = require('http');
const getRandomPlace = require('./resources/places');
const port = process.env.PORT || 8080;
const { nanoid } = require("nanoid");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})


const createNewPlayer = () => {
    const playerData = {
        position: {x:0, y:0},
        id:nanoid()
    }
    return playerData;
}

io.on("connection", (socket) => {
    const initData = getRandomPlace();
    console.log('connected well', initData );
    socket.emit('init', initData);
    socket.broadcast.emit('newEnemy', createNewPlayer());
    socket.on('move', m => {
        socket.broadcast.emit('enemy-move', m);
    })
})

httpServer.listen(port);