import KnapsackGaSolution from '../core/knapsack-ga-solution';
import GeneticAlgorithm from '../core/genetic-algorithm';

let solution;
let ga;

class GeneticAlgorithmService {
    start(knapsackParams, algorithmParams, geneticOperatorsParams) {
        solution = new KnapsackGaSolution(knapsackParams, geneticOperatorsParams);
        ga = new GeneticAlgorithm(solution, algorithmParams);

        ga.initialize();
    }

    getActualPopulation() {
        return [...ga.population];
    }

    getFinalPopulation() {

    }

    getObjects() {
        return [...solution.objects];
    }

    evolve() {
        let parents = ga.selectParents();

        parents = ga.crossover(parents);
        parents = ga.mutate(parents);
        ga.substitute(parents);
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

    getBestKnapsack(population){
        return [...population].sort((a, b) => solution.fitness(a) - solution.fitness(b))[population.length - 1];
    }
}

export default GeneticAlgorithmService;