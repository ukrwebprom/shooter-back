const players = []
//{roomId, playerId, position:startPos, socket}

const addPlayer = player => {
    players.push(player);
}
const removePlayer = player => {
    playerIndex = players.findIndex(option => option.playerId === player);
    players.splice(playerIndex, 1);
    return players;
}
const getPlayerInRoom = roomID => {
    return players.filter(option => option.roomId === roomID);
}
const findPlayerBySocketId = socket => {
    const player = players.find(option => option.socket === socket);
    return player?.playerId;
}
const getPlayersExcept = (playerId) => { // return array of sockets, incluning all players of the room excep one player
    const player = players.find(option => option.playerId === playerId);
    return players.filter(option => option.playerId !==playerId && option.roomId === player.roomId).map(opt => opt.socket);
}
/* const getPlayers = placeID => {
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
} */


module.exports = {
    addPlayer,
    findPlayerBySocketId,
    removePlayer,
    getPlayerInRoom,
    getPlayersExcept
/*     getPlayers,
    setPlayer,
    removePlayer,
    getPlayerData,
    getDataBySocketId,
    updatePlayerPosition */
};