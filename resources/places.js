const {stormShadow, desertRose} = require('./maps');

const places = [
    {name:'storm shadow', map:stormShadow},
    {name:'desert rose', map:desertRose}
]
const getRandomPlace = () => {
    return places[Math.floor(Math.random() * (places.length))];
}
const getPlace = (id) => {
    return places[id];
}
module.exports = {
    getRandomPlace,
    getPlace
};