const express = require("express");
const {postMap, mapsList, getMap, putMap} = require("./controller");
const {getPlace} = require('./places');
const {getPlayers} = require('./players');

const router = express.Router();

router.get("/", getMap);
/* (req, res) => {
    const map = getPlace(req.query.mapID);
    map.enemies = getPlayers(map.id);
    res.status(200).json(map);
  } */

router.get('/list', mapsList);
router.post("/", postMap);
router.put("/", putMap);



module.exports = router;