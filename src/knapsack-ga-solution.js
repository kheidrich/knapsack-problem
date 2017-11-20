const utils = require('./utils');

class KnapsackGaSolution {
    constructor(knapsackParameters, algorithmParameters) {
        this.knapsackParameters = knapsackParameters;
        this.algorithmParameters = algorithmParameters;
        this.objects;
    }

    initialize() {
        this.objects = utils.createFilledArray(this.knapsackParameters.numberOfObjects, {}).map(() => utils.createRandomKnapsackObject(this.knapsackParameters))
    }

    generatePopulation() {
        return utils.createFilledArray(
            this.algorithmParameters.populationSize,
            utils.createFilledArray(this.knapsackParameters.numberOfObjects, '')
        );
    }

    fitness(knapsack) {
        let { totalValue, totalWeight } = knapsack.reduce((sum, object) => {
            sum.totalValue += object.value;
            sum.totalWeight += object.weight;
            return sum;
        }, { totalValue: 0, totalWeight: 0 });

        return totalValue / totalWeight;
    }

    crossover(indivual1, individual2) {

    }

    mutation(inviduals) {

    }

    substitution(individuals, population) {

    }
}

module.exports = KnapsackGaSolution;
