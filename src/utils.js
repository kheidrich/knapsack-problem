const KnapsackObject = require('./knapsack-object');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function createFilledArray(size, value) {
    return (new Array(size)).fill(value);
}

function createRandomKnapsackObject({minValue, maxValue, minWeight, maxWeight}){
    return new KnapsackObject(
        getRandomInt(minValue, maxValue),
        getRandomInt(minWeight, maxWeight)
    );
}

module.exports = {
    getRandomInt,
    createFilledArray,
    createRandomKnapsackObject
}
