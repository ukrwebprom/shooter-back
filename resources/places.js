const {stormShadow, desertRose} = require('./maps');

const places = [
    {name:'storm shadow', map:stormShadow, start:{x:1, y:12}},
    {name:'desert rose', map:desertRose, start:{x:150, y:80}}
]

const getPlace = id => {
    const n = id? id : Math.floor(Math.random() * (places.length));
    return {...places[n], id:n};
}
const makeEmptyLand = n => {
    const land = Array.from({ length: n }, () => 
        Array.from({ length: n }, () => 0)
    );
    return land;
}

module.exports = {
    getPlace,
    makeEmptyLand
};