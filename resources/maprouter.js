const express = require("express");
const {postMap, mapsList, getMap, putMap} = require("./controller");
const {getPlace} = require('./rooms');
const {getPlayers} = require('./players');

const maprouter = express.Router();

maprouter.get("/", getMap);
/* (req, res) => {
    const map = getPlace(req.query.mapID);
    map.enemies = getPlayers(map.id);
    res.status(200).json(map);
  } */

maprouter.get('/list', mapsList);
maprouter.post("/", postMap);
maprouter.put("/", putMap);



module.exports = maprouter;