import { ipcRenderer } from 'electron';

class GeneticAlgorithmService {
    initialize(knapsackParams, algorithmParams, geneticOperatorsParams) {
        
    }

    getActualPopulation() {

    }

    getObjects() {

    }

    evolve() {

    }

    getSolution() {

    }

    getActualOptimal() {

    }

    getOptimalHistory() {

    }

    getKnapsackSummary(knapsack) {
        let fitness = solution.fitness(knapsack);

        return knapsack.reduce((summary, hasObject, index) => {
            if (hasObject) {
                summary.value += solution.objects[+index].value;
                summary.weight += solution.objects[+index].weight;
                summary.fitness = fitness;
                summary.objects++;
            }
            return summary;
        },
            { weight: 0, value: 0, objects: 0, fitness: 0 }
        )
    }

    getWorstKnapsack(population) {
        return [...population].sort((a, b) => solution.fitness(a) - solution.fitness(b))[0];
    }

    getBestKnapsack(population) {
        return [...population].sort((a, b) => solution.fitness(a) - solution.fitness(b))[population.length - 1];
    }
}

export default GeneticAlgorithmService;