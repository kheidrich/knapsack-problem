class ObjectGenerationParameters {
    constructor(
        numberOfObjects,
        maxKnapsackWeight,
        minValue,
        maxValue,
        minWeight,
        maxWeight
    ) {
        this.numberOfObjects = numberOfObjects;
        this.maxKnapsackWeight = maxKnapsackWeight;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.minWeight = minWeight;
        this.maxWeight = maxWeight;
    }
}

module.exports = ObjectGenerationParameters;
