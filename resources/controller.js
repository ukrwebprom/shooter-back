const Map = require('./model');
const {getRoomExcept, getMapId} = require('./rooms');
const {getPlayerInRoom} = require('./players');

const getMap = async (req, res) => {
    const mapID = req.query.id;
    const map = await Map.find({_id:mapID});
    const portals = map[0].walls.filter(option => option.tile === 1);
    const rndPortal = Math.floor(Math.random() * (portals.length));
    const start = {
        x: portals[rndPortal].x,
        y: portals[rndPortal].y,
    }
    const level = {...map[0]._doc, start};
    res.status(200).json(level);
}
const makeEmptyLand = n => {
    const land = []
    for(let i=0; i<n; i++)
        land.push(Array(n).fill(0))
    return land;
}
const postMap = async (req, res) => {
    const empty = makeEmptyLand(50);
    const newMap = await Map.create({...req.body, ground:empty, walls:[]});
    res.status(200).json(newMap);
}
const putMap = async(req, res) => {
    const _id = req.body.id;
    const ground = req.body.map;
    const walls = req.body.walls;
    console.log(walls);
    const newMap = await Map.findByIdAndUpdate(_id, {ground:ground, walls:walls});
    res.status(200).json('ok');
}
const mapsList = async (req, res) => {
    const list = await Map.find({}, {ground:false});
    res.status(200).json(list);
}

const getRoom = async (req, res) => {
    const roomID = req.query.id;
    const newRoomData = await getRoomExcept(roomID);
    const newRoom = {
        ...newRoomData,
        players: getPlayerInRoom(newRoomData.roomId).map(option => {return {playerId:option.playerId, position:option.position}})
    }
    res.status(200).json(newRoom);
}
module.exports = {
    getMap,
    postMap,
    putMap,
    mapsList,
    getRoom
}