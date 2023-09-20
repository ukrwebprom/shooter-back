const {Server} = require ('socket.io');
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const maprouter = require('./resources/maprouter');
const roomsrouter = require('./resources/roomsrouter');
const {createServer} = require('http');

const {addPlayer, removePlayer, findPlayerBySocketId, getPlayersExcept, updatePlayerPosition} = require('./resources/players');

const port = process.env.PORT || 8080;

const connectedSockets = new Set();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/map", maprouter);
app.use("/rooms", roomsrouter);

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})


io.on("connection", (socket) => {
    console.log('connected well');
    connectedSockets.add(socket);
    
    socket.on('enter', data => {
        console.log(data);
        const {playerId, startPos, roomId} = data;
        addPlayer({roomId, playerId, position:startPos, socket});
        getPlayersExcept(playerId).forEach(option => option.emit('newEnemy', {playerId, position:startPos}));
    })

    socket.on('disconnect', () => {
        const userDisconnected = findPlayerBySocketId(socket);
        const coPlayers = removePlayer(userDisconnected);
        if(coPlayers) coPlayers.forEach(option => option.socket.emit('removeEnemy', userDisconnected));
    });

    socket.on('move', data => {
        
        const coPlayers = getPlayersExcept(data.playerId);
        coPlayers.forEach(option => option.emit('move', data));
    })

    socket.on('stop', (id) => {
        console.log('stop');
        const coPlayers = getPlayersExcept(id);
        coPlayers.forEach(option => option.emit('stop', id));
    })

     socket.on('updatePosition', data => {
        console.log(data);
        updatePlayerPosition(data.playerId, data.position);
    })

 /*   socket.on('getEnemyPositions', data => {
        const positions = getPlayers(data.roomId);
        socket.emit('update', positions);
    }) */
})
mongoose.connect('mongodb+srv://Duca:Z6ioGxRuEdqioxOy@cluster0.h8c3xnw.mongodb.net/gamedata')
.then(() => {
  console.log("Database connection successful");
  httpServer.listen(port);
  console.log("ich bin server");
})
.catch ((err) => {
  console.log(err.message);
  process.exit(1);
  }
)
