import { ipcRenderer } from 'electron';

class GeneticAlgorithmService {
    async initialize(knapsackParams, algorithmParams, geneticOperatorsParams) {
        return await this.executeResolverMethod('initialize', [ knapsackParams, algorithmParams, geneticOperatorsParams ]);
    }

    async getActualPopulation() {
        return await this.executeResolverMethod('getActualPopulation');
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

    async getKnapsackSummary(knapsack){
        return await this.executeResolverMethod('getKnapsackSummary', [knapsack]);
    }

    async getWorstKnapsack(population) {
        return await this.executeResolverMethod('getWorstKnapsack', [population]);
    }

    async getBestKnapsack(population) {
        return await this.executeResolverMethod('getBestKnapsack', [population]);
    }

    executeResolverMethod(method, params=[]) {
        return new Promise((resolve, reject) => {
            ipcRenderer.send('execute-resolver-method', { method, params });
            ipcRenderer.once('resolver-reply', (event, reply) => {
                (reply.status === 'error') ?
                    reject(reply.error) :
                    resolve(reply.data)
            });
        });
    }
}

export default GeneticAlgorithmService;