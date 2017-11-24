const utils = require('./utils');
class GeneticAlgorithm {
    constructor(solution, algorithmParams) {
        this.population = [];
        this.populationHistory = [];
        this.optimalHistory = [];
        this.actualOptimal = [];
        this.iterations = 0;
        this.solution = solution;
        this.algorithmParams = algorithmParams;
    }

    initialize() {
        this.solution.initialize();
        this.population = this.solution.generatePopulation(this.algorithmParams.populationSize);
    }

    stopCriteriaReached() {

    }

    evolve() {

    }

    getSolution() {

    }
}

module.exports = GeneticAlgorithm;
