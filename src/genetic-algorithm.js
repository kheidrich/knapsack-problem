const utils = require('./utils');
class GeneticAlgorithm {
    constructor(generationParameters, algorithmParameters) {
        this.generationParameters = generationParameters;
        this.algorithmParameters = algorithmParameters;
        this.population;
        this.selection;
        this.crossover;
        this.mutation;
        this.substitution;
    }

    initialize() {
        this.population = utils.createFilledArray(
            this.algorithmParameters.populationSize,
            utils.createFilledArray(this.generationParameters.numberOfObjects, {})
        )
            .map(knapsack => knapsack.map(() => utils.createRandomKnapsackObject(this.generationParameters)))
    }

    solutionFound(){

    }

    evolve() {
        
    }

    getSolution(){

    }
}

module.exports = GeneticAlgorithm;
