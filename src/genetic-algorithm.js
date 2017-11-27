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
        this.utils = utils;
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

    selectParents() {
        let parentsToSelect = (Math.round(this.algorithmParams.populationSize * this.algorithmParams.generationInterval / 100));
        const generationIntervalIsOdd = (parentsToSelect % 2 !== 0);

        if (generationIntervalIsOdd)
            parentsToSelect++;

        return this.solution.selection(this.population, parentsToSelect);
    }

    crossover(parents) {
        let newParents = [];

        for (let parentIndex in parents) if (parentIndex % 2 === 0){
            const doCrossover = this.utils.shouldDoSomething(this.algorithmParams.crossoverRate);
            let crossed, firstParent, secondParent;

            firstParent = parents[+parentIndex];
            secondParent = parents[1 + +parentIndex];
            crossed = doCrossover ? this.solution.crossover(firstParent, secondParent) : [firstParent, secondParent];

            newParents.push(...crossed);
        }
        
        return newParents;
    }

    getSolution() {

    }
}

module.exports = GeneticAlgorithm;
