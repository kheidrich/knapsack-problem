const utils = require('./utils');
const KnapsackObject = require('./knapsack-object');

class KnapsackGaSolution {
    constructor(knapsackParams) {
        this.knapsackParams = knapsackParams;
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

        return totalWeight <= this.knapsackParams.maxKnapsackWeight ? totalValue / totalWeight : 0;
    }

    selection(population, generationInterval) {
        let selection = (new Array(this.algorithmParams.generationInterval)).fill([]);

        return selection.map(() => {
            let competitors = [];
            let winner;

            competitors.push(this.utils.selectRandomItem(population));
            competitors.push(this.utils.selectRandomItem(population));

            winner = this.fitness(competitors[0]) >= this.fitness(competitors[1]) ? competitors[0] : competitors[1]
            return winner;
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

    mutation(newKnapsacks) {

    }

    substitution(newKnapsacks, population) {

    }
}

module.exports = KnapsackGaSolution;

