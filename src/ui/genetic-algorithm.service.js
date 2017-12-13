import { ipcRenderer } from 'electron';

class GeneticAlgorithmService {
    async initialize(knapsackParams, algorithmParams, geneticOperatorsParams) {
        return await this.executeResolverMethod('initialize', [ knapsackParams, algorithmParams, geneticOperatorsParams ]);
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

    executeResolverMethod(method, params=[]) {
        return new Promise((resolve, reject) => {
            ipcRenderer.send('execute-resolver-method', { method, params });
            ipcRenderer.on('resolver-reply', (event, reply) => {
                console.log(reply);
                (reply.status === 'error') ?
                    reject(reply.error) :
                    resolve(reply.data)
            });
        });
    }
}

export default GeneticAlgorithmService;