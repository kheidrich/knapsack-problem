const BagObject = require('./object');
const BagParameters = require('./bag-parameters');

let POPULATION_SIZE = 30;
let NUMBER_OF_OBJECTS = 20;
let MAX_BAG_WEIGHT = 20;
let MIN_OBJECT_WEIGHT = 1;
let MAX_OBJECT_WEIGHT = 5;
let MIN_OBJECT_VALUE = 1;
let MAX_OBJECT_VALUE = 100;


let bag = ((new Array(NUMBER_OF_OBJECTS))
    .fill({}))
    .map(() =>
        BagObject(
            getRandomInt(MIN_OBJECT_VALUE, MAX_OBJECT_VALUE),
            getRandomInt(MIN_OBJECT_WEIGHT, MAX_OBJECT_WEIGHT)
        )
    );
let population = (new Array(POPULATION_SIZE)).fill(bag);

console.log(bag)
console.log(fitness(bag, { value: 2000, weight: 20 }));

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