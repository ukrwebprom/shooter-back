const {stormShadow, desertRose} = require('./maps');

const places = [
    {name:'storm shadow', map:stormShadow},
    {name:'desert rose', map:desertRose}
]

const getPlace = id => {
    return places[id ?? Math.floor(Math.random() * (places.length))];
}
module.exports = {
    getPlace
};