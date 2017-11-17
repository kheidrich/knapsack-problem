const KnapsackObject = require('./knapsack-object');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function createFilledArray(size, value) {
    return (new Array(size)).fill(value);
}

function createRandomKnapsackObject(){
    return KnapsackObject(
        getRandomInt(ObjectGenerationParameters.minValue, ObjectGenerationParameters.maxValue),
        getRandomInt(ObjectGenerationParameters.minWeight, ObjectGenerationParameters.maxWeight)
    );
}

module.exports = {
    getRandomInt,
    createFilledArray,
    createRandomKnapsackObject
}
