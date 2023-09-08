const express = require("express");
const {getRoom} = require("./controller");

const roomsrouter = express.Router();

roomsrouter.get("/", getRoom);




module.exports = roomsrouter;