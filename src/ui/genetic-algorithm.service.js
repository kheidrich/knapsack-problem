class GeneticAlgorithmService {
    constructor(IpcService){
        this.IpcService = IpcService;
    }

    initialize(knapsackParams, algorithmParams, geneticOperatorsParams) {
        return this.executeResolverMethod('initialize', [knapsackParams, algorithmParams, geneticOperatorsParams]);
    }

    getActualPopulation() {
        return this.executeResolverMethod('getActualPopulation');
    }

    getObjects() {
        return this.executeResolverMethod('getObjects');
    }

    async solve(maxIterations, optimalStabilization, updateListener) {
        this.IpcService.listen('solve-update', updateListener);
        let reply = await this.executeResolverMethod('solve', [maxIterations, optimalStabilization]);
        this.IpcService.clean('solve-update')
        return reply;
    }

    getSolution() {

    }

    getActualOptimal() {

    }

    getOptimalHistory() {

    }

    getKnapsackObjects(knapsack) {
        return this.executeResolverMethod('getKnapsackObjects', [knapsack]);
    }

    getKnapsackSummary(knapsack) {
        return this.executeResolverMethod('getKnapsackSummary', [knapsack]);
    }

    getWorstKnapsack(population) {
        return this.executeResolverMethod('getWorstKnapsack', [population]);
    }

    getBestKnapsack(population) {
        return this.executeResolverMethod('getBestKnapsack', [population]);
    }

    executeResolverMethod(method, params = []) {
        return this.IpcService.request(
            'execute-resolver-method',
            { method, params }
        );
    }
}

export default GeneticAlgorithmService;