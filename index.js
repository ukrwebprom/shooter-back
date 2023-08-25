const {Server} = require ('socket.io');
const express = require("express");
const cors = require("cors");
const {createServer} = require('http');
const {getPlace} = require('./resources/places');
const {setPlayer, getPlayers, removePlayer, getPlayerData, getDataBySocketId, updatePlayerPosition} = require('./resources/players');

const port = process.env.PORT || 8080;
const { nanoid } = require("nanoid");
const connectedSockets = new Set();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/map", (req, res) => {
    const map = getPlace(req.query.mapID);
    const playerID = req.query.playerID;
    map.enemies = getPlayers(map.id);
    
    res.status(200).json(map);
  });

const httpServer = createServer(app);
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
const broadcast = (action, data, id, ownSocket) => {
    getPlayers(id).forEach(el => {
        const socketID = el.socket;
        if(socketID !== ownSocket) return false;
        for (const targetSocket of connectedSockets) {
            if (targetSocket.id !== socketID) {
                targetSocket.emit(action, data);
            }
        }
    })
}
io.on("connection", (socket) => {
    console.log('connected well');
    connectedSockets.add(socket);
    
    socket.on('disconnect', () => {
        const playerData = getDataBySocketId(socket.id);
        broadcast('removeEnemy', playerData?.playerID, playerData?.fightRoom, socket.id);
        connectedSockets.delete(socket);
        removePlayer(socket.id);
        console.log('disconnected. live sockets:');
        for (const targetSocket of connectedSockets) {
            console.log(targetSocket.id);
        }
    });

    socket.on('enter', data => {
        const {playerId, roomId} = data;
         setPlayer(playerId, roomId, socket.id);
         broadcast('newEnemy', getPlayerData(playerId), roomId, socket.id);
    })

    socket.on('move', data => {
        console.log(data);
        const playerData = getDataBySocketId(socket.id);
        const info = {
            direction: data,
            playerId: playerData?.playerID
        }
        broadcast('move', info, playerData?.fightRoom, socket.id);
    })

    socket.on('stop', () => {
        console.log('stop');
        const playerData = getDataBySocketId(socket.id);
        broadcast('stop', playerData?.playerID, playerData?.fightRoom, socket.id);
    })

    socket.on('updatePosition', data => {
        updatePlayerPosition(data.playerId, data.position);
    })
})

httpServer.listen(port);
console.log("ich bin server");