const utils = require('./utils');
const KnapsackObject = require('./knapsack-object');

class KnapsackGaSolution {
    constructor(knapsackParams, algorithmParams) {
        this.knapsackParams = knapsackParams;
        this.algorithmParams = algorithmParams;
        this.utils = utils;
        this.objects;
    }

    initialize() {
        let objects = (new Array(this.knapsackParams.numberOfObjects).fill({}));

        this.objects = objects.map(() => new KnapsackObject(
            this.utils.getRandomInt(this.knapsackParams.minObjectValue, this.knapsackParams.maxObjectValue),
            this.utils.getRandomInt(this.knapsackParams.minObjectWeight, this.knapsackParams.maxObjectWeight)
        ));
    }

    generatePopulation() {
        let population = (new Array(this.algorithmParams.populationSize));
        let knapsack = (new Array(this.knapsackParams.numberOfObjects));
        population.fill(knapsack.fill(0));

        return population.map(knapsack => knapsack.map(() => this.utils.getRandomInt(0, 1)))
    }

    fitness(knapsack) {
        let { totalValue, totalWeight } = knapsack.reduce(
            (sum, hasObject, index) => {
                if (hasObject) {
                    sum.totalValue += this.objects[index].value;
                    sum.totalWeight += this.objects[index].weight;
                }
                return sum;
            },
            { totalValue: 0, totalWeight: 0 }
        );

        return totalWeight <= this.knapsackParams.maxKnapsackWeight ? totalValue / totalWeight : 0;
    }

    crossover(knapsack1, knapsack2) {

    }

    mutation(newKnapsacks) {

    }

    substitution(newKnapsacks, population) {

    }
}

module.exports = KnapsackGaSolution;
