import { ipcRenderer } from 'electron';
ipcRenderer.setMaxListeners(3000);

class GeneticAlgorithmService {
    async initialize(knapsackParams, algorithmParams, geneticOperatorsParams) {
        return await this.executeResolverMethod('initialize', [ knapsackParams, algorithmParams, geneticOperatorsParams ]);
    }

    async getActualPopulation() {
        return await this.executeResolverMethod('getActualPopulation');
    }

    getObjects() {

    }

    async solve(maxIterations, optimalEstabilization) {
        return await this.executeResolverMethod('solve', [maxIterations, optimalEstabilization]);
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
            ipcRenderer.on('resolver-reply', (event, reply) => {
                (reply.status === 'error') ?
                    reject(reply.error) :
                    resolve(reply.data)
            });
        });
    }
}

export default GeneticAlgorithmService;