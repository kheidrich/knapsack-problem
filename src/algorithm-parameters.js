class AlgorithmParameters {
    constructor(
        populationSize,
        mutationRate,
        crossoverRate,
        generationInterval,
        maxIterations,
        optimalStabilization
    ) {
        this.populationSize = populationSize;
        this.generationInterval = generationInterval;
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;
        this.maxIterations = maxIterations;
        this.optimalStabilization = optimalStabilization;
    }
}

module.exports = AlgorithmParameters;
