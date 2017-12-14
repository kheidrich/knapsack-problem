const utils = require('./utils');
const KnapsackObject = require('./knapsack-object');

class KnapsackGaSolution {
    constructor(knapsackParams, geneticOperatorsParameters) {
        this.knapsackParams = knapsackParams;
        this.geneticOperatorsParams = geneticOperatorsParameters;
        this.utils = utils;
        this.objects;
    }

    initialize() {
        let objects = (new Array(this.knapsackParams.numberOfObjects).fill({}));

        this.objects = objects.map(() => new KnapsackObject(
            this.utils.getRandomNumber(this.knapsackParams.minObjectValue, this.knapsackParams.maxObjectValue, 1),
            this.utils.getRandomNumber(this.knapsackParams.minObjectWeight, this.knapsackParams.maxObjectWeight, 1)
        ));
    }

    generatePopulation(size) {
        let population = (new Array(size));
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

        const maxWeightExceeded = totalWeight > this.knapsackParams.maxKnapsackWeight;
        const hasObjects = totalWeight > 0;
        const fitnessValue = totalValue - totalWeight;

        return !maxWeightExceeded && hasObjects ? fitnessValue  : 0;
    }

    selection(population, quantity) {
        let selection = (new Array(quantity)).fill([]);

        return selection.map(() => {
            let competitor1, competitor2;
            let winner;

            competitor1 = this.utils.selectRandomItem(population);
            competitor2 = this.utils.selectRandomItem(population);

            winner = this.fitness(competitor1) >= this.fitness(competitor2) ? competitor1 : competitor2;
            return [...winner];
        });
    }

    crossover(knapsack1, knapsack2) {
        const minCutPoint = 1;
        const maxCutPoint = knapsack1.length - 2;
        let child1, child2, cutPoint;
        let parent1RemainderGenes, parent2RemainderGenes;
        let parent1CuttedGenes, parent2CuttedGenes;

        cutPoint = this.utils.getRandomInt(minCutPoint, maxCutPoint);

        parent1RemainderGenes = knapsack1.slice(0, cutPoint);
        parent1CuttedGenes = knapsack1.slice(cutPoint);

        parent2RemainderGenes = knapsack2.slice(0, cutPoint);
        parent2CuttedGenes = knapsack2.slice(cutPoint);

        child1 = [...parent1RemainderGenes, ...parent2CuttedGenes];
        child2 = [...parent2RemainderGenes, ...parent1CuttedGenes];

        return [child1, child2];
    }

    mutation(knapsack) {
        const numberOfGenesToMutate = Math.ceil(knapsack.length * this.geneticOperatorsParams.geneMutationRate / 100);
        let indexesOfGenesToMutate = new Set();

        while (indexesOfGenesToMutate.size < numberOfGenesToMutate)
            indexesOfGenesToMutate.add(this.utils.getRandomInt(0, knapsack.length - 1));

        return knapsack.map((object, index) => {
            const hasToMutate = (indexesOfGenesToMutate.has(index));

            return hasToMutate ? +(!object) : object;
        });
    }

    substitution(knapsacks, population) {
        const newKnapsacks = [...knapsacks];
        const populationSortedByFitness = [...population].sort((a, b) => this.fitness(a) - this.fitness(b));
        const numberOfKnapsacksToSubstitute = knapsacks.length;
        let knapsacksToSubstitute = populationSortedByFitness.filter((knapsack, index) => index < numberOfKnapsacksToSubstitute);

        return population.map((knapsack) => {
            const hasToSubstitute = knapsacksToSubstitute.indexOf(knapsack) > -1;

            if (hasToSubstitute) {
                knapsacksToSubstitute.splice(knapsacksToSubstitute.indexOf(knapsack), 1);
                return newKnapsacks.pop();
            }
            else
                return knapsack;
        });
    }
}

module.exports = KnapsackGaSolution;

