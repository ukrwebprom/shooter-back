const Map = require('./model');
const { nanoid } = require("nanoid");
const rooms = [];
const playersLimit = 20;
const {getPlayerInRoom} = require('./players');

const makeNewRoom = async () => {
    const maps = await Map.find({}, {ground:false});
    const randomMapIndex = Math.floor(Math.random() * maps.length);
    const n = rooms.push({
        roomId: nanoid(),
        mapId: maps[randomMapIndex]._id,
    });
    return rooms[n-1];
}

const getRoomExcept = async (n) => {
    const availableRooms = rooms.filter(option => 
        option.roomId !== n && 
        getPlayerInRoom(option.roomId).length < playersLimit);
    if(availableRooms.length > 0) {
        const randomMapIndex = Math.floor(Math.random() * availableRooms.length);
        return availableRooms[randomMapIndex];
    } else {
        const newRoom = await makeNewRoom();
        return newRoom;
    }
}

const getRoom = id => {
    return rooms.findIndex(option => option.roomId === id);
}


const enterRoom = (id, player) => {
    rooms[getRoom(id)].players.push(player);
}
const findPlayerBySocketId = socket => {
    const player = rooms.flatMap(option => option.players).find(option => option.socket === socket);
    return player?.playerId;
}
const exitRoom = (playerId) => {
    let coPlayers = null;
    rooms.forEach((room, i) => {
        const index = room.players.findIndex(player => player.playerId === playerId);
        if(index !== -1) {
            room.players.splice(index, 1);
            coPlayers = room.players;
            if(room.players.length === 0) rooms.splice(i, 1);
        }
    })
    return coPlayers;
}
const getMapId = roomID => {
    const index = rooms.findIndex(option => option.roomId === roomID);
    if(index !== -1) return rooms[index].mapId;
}

module.exports = {
    getRoomExcept,
    enterRoom,
    exitRoom,
    getMapId,
    findPlayerBySocketId
};