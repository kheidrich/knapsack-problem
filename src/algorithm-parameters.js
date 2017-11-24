class AlgorithmParameters {
    constructor(
        populationSize,
        mutationRate,
        crossoverRate,
        generationInterval,
        maxIterations,
        optimalEstabilization
    ) {
        this.populationSize = populationSize;
        this.generationInterval = generationInterval;
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;
        this.maxIterations = maxIterations;
        this.optimalEstabilization = optimalEstabilization;
    }
}

module.exports = AlgorithmParameters;
