function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function createFilledArray(size, value) {
    return (new Array(size)).fill(value);
}

module.exports = {
    getRandomInt,
    createFilledArray
}
