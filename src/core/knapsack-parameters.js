class KnapsackParameters {
    constructor(
        numberOfObjects,
        maxKnapsackWeight,
        minObjectValue,
        maxObjectValue,
        minObjectWeight,
        maxObjectWeight
    ) {
        this.numberOfObjects = numberOfObjects;
        this.maxKnapsackWeight = maxKnapsackWeight;
        this.minObjectValue = minObjectValue;
        this.maxObjectValue = maxObjectValue;
        this.minObjectWeight = minObjectWeight;
        this.maxObjectWeight = maxObjectWeight;
    }
}

module.exports = KnapsackParameters;
