const { getPlace } = require("./places");
const players = []

const getPlayers = placeID => {
    return players.filter(player => player.fightRoom === placeID);
}
const getPlayerData = playerID => {
    return players.find(p => p.playerID === playerID);
}
const getDataBySocketId = id => {
    const playerIndex = players.findIndex(p => p.socket === id);
    if(playerIndex === -1) return null;
    else {
        const {fightRoom, playerID} = players[playerIndex];
        return {fightRoom, playerID}
    }
}
const updatePlayerPosition = (playerID, position) => {
    const playerIndex = players.findIndex(p => p.playerID === playerID);
    if(playerIndex !== -1) players[playerIndex].position = position;
}

const setPlayer = (playerID, fightRoom, socket) => {
    const playerIndex = players.findIndex(p => p.playerID === playerID);
    const {start} = getPlace(fightRoom);
    if(playerIndex === -1) players.push({ playerID, fightRoom, socket, position:start });
    else {
        players[playerIndex].fightRoom = fightRoom;
        players[playerIndex].position = start;
    }
}
const removePlayer = socket => {
    const playerIndex = players.findIndex(p => p.socket === socket);
    players.splice(playerIndex, 1);
}


module.exports = {
    getPlayers,
    setPlayer,
    removePlayer,
    getPlayerData,
    getDataBySocketId,
    updatePlayerPosition
};