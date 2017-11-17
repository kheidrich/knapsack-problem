const POPULATION_SIZE = 30;
const NUMBER_OF_OBJECTS = 20;
const MAX_KNAPSACK_WEIGHT = 20;
const MIN_OBJECT_WEIGHT = 1;
const MAX_OBJECT_WEIGHT = 5;
const MIN_OBJECT_VALUE = 1;
const MAX_OBJECT_VALUE = 100;

const KnapsackObject = require('./knapsack-object');
const ObjectGenerationParameters = require('./object-generation-parameters')(
    NUMBER_OF_OBJECTS,
    MAX_KNAPSACK_WEIGHT,
    MIN_OBJECT_VALUE,
    MAX_OBJECT_VALUE,
    MIN_OBJECT_WEIGHT,
    MAX_OBJECT_WEIGHT
);

let population = createFilledArray(
    POPULATION_SIZE,
    createFilledArray(ObjectGenerationParameters.numberOfObjects, {})
);
function fitness(bag, bestSubject) {
    let { totalValue, totalWeight } = bag.reduce((sum, object) => {
        sum.totalValue += object.value;
        sum.totalWeight += object.weight;
        return sum;
    }, { totalValue: 0, totalWeight: 0 });

    const valueRate = totalValue * 100 / bestSubject.value;
    const weightRate = totalWeight * 100 /( bestSubject.weight * 2 );

    return (valueRate + weightRate) / 2;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function createFilledArray(size, value) {
    return (new Array(size)).fill(value);
}
