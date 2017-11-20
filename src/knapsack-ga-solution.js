const utils = require('./utils');

class KnapsackGaSolution {
    constructor(knapsackParameters, algorithmParameters) {
        this.knapsackParameters = knapsackParameters;
        this.algorithmParameters = algorithmParameters;
        this.utils = utils;
        this.objects;
    }

    initialize() {
        let objects = (new Array(this.knapsackParameters.numberOfObjects).fill({}));

        this.objects = objects.map(() => this.utils.createRandomKnapsackObject(this.knapsackParameters));
    }

    generatePopulation() {
        let population = (new Array(this.algorithmParameters.populationSize));
        let knapsack = (new Array(this.knapsackParameters.numberOfObjects));
        population.fill(knapsack.fill(0));
        return population.map(knapsack => knapsack.map(() => this.utils.getRandomInt(0, 1)))
    }

    fitness(knapsack) {
        let { totalValue, totalWeight } = knapsack.reduce((sum, object) => {
            sum.totalValue += object.value;
            sum.totalWeight += object.weight;
            return sum;
        }, { totalValue: 0, totalWeight: 0 });

        return totalValue / totalWeight;
    }

    crossover(knapsack1, knapsack2) {

    }

    mutation(newKnapsacks) {

    }

    substitution(newKnapsacks, population) {

    }
}

module.exports = KnapsackGaSolution;
