const {Server} = require ('socket.io');
const {createServer} = require('http');
const getRandomPlace = require('./resources/places');
const port = process.env.PORT || 8080;
const { nanoid } = require("nanoid");

const httpServer = createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Привет, мир!\n');
});
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
/*     const initData = getRandomPlace();*/
    console.log('connected well');
    const playerData = {
        position: {x:0, y:0},
        id:nanoid()
    }
    socket.emit('init', playerData);
    socket.broadcast.emit('newEnemy', playerData);

    socket.on('move', m => {
        socket.broadcast.emit('enemy-move', m);
        console.log('player moved', m);
    })
})

httpServer.listen(port);