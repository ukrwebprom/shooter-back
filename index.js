const {Server} = require ('socket.io');
const express = require("express");
const cors = require("cors");
const {createServer} = require('http');
const {getPlace} = require('./resources/places');
const port = process.env.PORT || 8080;
const { nanoid } = require("nanoid");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/map", (req, res) => {
    const mapID = req.query.mapID;
    const map = getPlace(mapID)
    console.log('requested map:', mapID, map)
    res.status(200).json(map);
/*     else res.status(200).json(getRandomPlace()); */
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

/* app.listen(port, () => {
    console.log(`Server running. Use our API on port: ${port}`);
  }); */
httpServer.listen(port);