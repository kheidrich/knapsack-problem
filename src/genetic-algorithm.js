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

    updateOptimal() {
        this.actualOptimal = this.population.reduce(
            (optimal, individual) => {
                const betterThanOptimal = this.solution.fitness(individual) > this.solution.fitness(optimal);

                return betterThanOptimal ? individual : optimal;
            },
            []
        );
        this.optimalHistory.push(this.actualOptimal);
    }

    stopCriteriaReached() {
        const lastOptimals = [...this.optimalHistory].reverse().filter((optimal, index) => index < this.algorithmParams.optimalStabilization);
        const optimalHistoryStabilized = (lastOptimals.every(optimal => optimal === this.actualOptimal) && this.algorithmParams.optimalStabilization > 0);
        const maxIterationsReached = (this.iterations === this.algorithmParams.maxIterations && this.algorithmParams.maxIterations > 0);

        return maxIterationsReached || optimalHistoryStabilized;
    }

    evolve() {

    }

    getSolution() {

    }
}

module.exports = GeneticAlgorithm;
