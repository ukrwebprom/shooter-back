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
    console.log('connected well', getRandomPlace() );
    socket.on('move', m => {
        socket.broadcast.emit('enemy-move', m);
    })
})

httpServer.listen(port);