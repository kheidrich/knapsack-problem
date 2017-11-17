function ObjectGenerationParameters(
    numberOfObjects,
    maxKnapsackWeight,
    minValue,
    maxValue,
    minWeight,
    maxWeight
){
    return {
        numberOfObjects,
        maxKnapsackWeight,
        minValue,
        maxValue,
        minWeight,
        maxWeight
    }
}

module.exports = ObjectGenerationParameters;
