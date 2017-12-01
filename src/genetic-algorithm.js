const utils = require('./utils');

class GeneticAlgorithm {
    constructor(solution, algorithmParams) {
        this.population = [];
        this.optimalHistory = [];
        this.actualOptimal = 0;
        this.solution = solution;
        this.algorithmParams = algorithmParams;
        this.utils = utils;
    }

    initialize() {
        this.solution.initialize();
        this.population = this.solution.generatePopulation(this.algorithmParams.populationSize);
    }

    updateOptimal() {
        this.population.forEach(individual => {
            const betterThanOptimal = this.solution.fitness(individual) > this.actualOptimal;

            this.actualOptimal = betterThanOptimal ? this.solution.fitness(individual) : this.actualOptimal;
        });
        this.optimalHistory.push(this.actualOptimal);
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

        for (let parentIndex in parents) if (parentIndex % 2 === 0) {
            let crossed, firstParent, secondParent;

            firstParent = parents[+parentIndex];
            secondParent = parents[+parentIndex + 1];
            crossed = this.solution.crossover(firstParent, secondParent);

            newParents.push(...crossed);
        }

        return newParents;
    }

    mutate(parents) {
        const numberOfParentsToMutate = Math.round(parents.length * this.algorithmParams.mutationRate / 100);
        const indexesOfParentsToMutate = new Set();

        while(indexesOfParentsToMutate.size < numberOfParentsToMutate)
            indexesOfParentsToMutate.add(this.utils.getRandomInt(0, parents.length));

        return parents.map((parent, index) => {
            const hasToMutate = indexesOfParentsToMutate.has(index);

            return hasToMutate ? this.solution.mutation(parent) : parent;
        });
    }

    substitute(parents) {
        this.population = this.solution.substitution(parents, this.population);
    }

    getSolution() {

    }
}

module.exports = GeneticAlgorithm;
