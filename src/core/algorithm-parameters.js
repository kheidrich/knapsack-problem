class AlgorithmParameters {
    constructor(
        populationSize,
        mutationRate,
        crossoverRate,
        generationInterval
    ) {
        this.populationSize = populationSize;
        this.generationInterval = generationInterval;
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;
    }
}

module.exports = AlgorithmParameters;
