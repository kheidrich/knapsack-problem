const KnapsackObject = require('./knapsack-object');
const types = {
    'Array': [],
    'Object': {}
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumber(min, max, decimals = 0){
    min = Math.ceil(min);
    max = Math.floor(max);
    return +(Math.random() * (max - min + 1)).toFixed(decimals) + min;
}

function createFilledArray(size, value) {
    return (new Array(size)).fill(value);
}

function createRandomKnapsackObject({ minValue, maxValue, minWeight, maxWeight }) {
    return new KnapsackObject(
        getRandomInt(minValue, maxValue),
        getRandomInt(minWeight, maxWeight)
    );
}

function shouldDoSomething(probability) {
    if (probability < 1 || probability > 100) throw new Error('Probability should be between 1 and 100');

    return (Math.round(Math.random() * 100) <= probability);
}

function selectRandomItem(array) {
    let item = array[getRandomInt(0, array.length - 1)];

    return Object.assign(types[item.constructor.name], item);
}

module.exports = {
    getRandomInt,
    getRandomNumber,
    createFilledArray,
    createRandomKnapsackObject,
    shouldDoSomething,
    selectRandomItem
}
