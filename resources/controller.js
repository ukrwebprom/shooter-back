const Map = require('./model');
const {makeEmptyLand} = require('./places');

const getMap = async (req, res) => {
    
    const mapID = req.query.id;
    console.log(mapID);
    const map = await Map.find({_id:mapID});
    res.status(200).json(map[0]);
}

const postMap = async (req, res) => {
    const empty = makeEmptyLand(50);
    const newMap = await Map.create({...req.body, ground:empty});
    
    res.status(200).json(newMap);
}
const putMap = async(req, res) => {
    const _id = req.body.id;
    const data = req.body.map;
    const newMap = await Map.findByIdAndUpdate(_id, {ground:data});
    res.status(200).json('ok');
}
const mapsList = async (req, res) => {
    const list = await Map.find({}, {ground:false});
    res.status(200).json(list);
}
module.exports = {
    getMap,
    postMap,
    putMap,
    mapsList
}