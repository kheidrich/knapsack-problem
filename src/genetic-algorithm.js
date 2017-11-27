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

        if (parentsToSelect % 2 !== 0)
            parentsToSelect++;

        return this.solution.selection(this.population, parentsToSelect);
    }
    evolve() {
        let numberOfIndividualsToSubstitute = (Math.round(this.algorithmParams.populationSize * this.algorithmParams.generationInterval / 100));
        const quantityToSubstitueIsOdd = (numberOfIndividualsToSubstitute % 2 !== 0);
        let parents;
        let pairedParents;

        parents = this.solution.selection(
            this.population,
            (quantityToSubstitueIsOdd ? ++numberOfIndividualsToSubstitute : numberOfIndividualsToSubstitute)
        );

        pairedParents = parents.reduce((pairs, parent, index) => {
            const firstParent = 0;
            const secondParent = 1;
            let pairIndex = Math.floor(index / 2);
            let parentIndex = (index % 2 === 0) ? firstParent : secondParent;

            if (!pairs[pairIndex]) pairs[pairIndex] = [];
            pairs[pairIndex][parentIndex] = parent;
            
            return pairs;
        }, (new Array(numberOfIndividualsToSubstitute / 2)));

        pairedParents.forEach(pair => {
            const doCrossover = this.utils.shouldDoSomething(this.algorithmParams.crossoverRate);

            if (doCrossover)
             this.solution.crossover(pair[0], pair[1]);
        });
    }

    getSolution() {

    }
}

module.exports = GeneticAlgorithm;
