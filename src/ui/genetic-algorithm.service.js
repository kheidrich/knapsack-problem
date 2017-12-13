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

    solve(maxIterations, optimalEstabilization) {
        return this.executeResolverMethod('solve', [maxIterations, optimalEstabilization]);
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