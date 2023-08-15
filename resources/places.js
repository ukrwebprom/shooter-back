const places = [
    'storm shadow',
    'desert rose'
]
const getRandomPlace = () => {
    return places[Math.floor(Math.random() * (places.length + 1))];
}
module.exports = getRandomPlace;