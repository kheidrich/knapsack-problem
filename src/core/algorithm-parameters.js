class AlgorithmParameters {
    constructor(
        populationSize,
        mutationRate,
        generationInterval
    ) {
        this.populationSize = populationSize;
        this.generationInterval = generationInterval;
        this.mutationRate = mutationRate;
    }
}

module.exports = AlgorithmParameters;
