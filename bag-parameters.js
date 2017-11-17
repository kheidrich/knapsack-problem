function BagParameters(
    numberOfObjects,
    maxBagWeight,
    minObjectValue,
    maxObjectValue,
    minObjectWeight,
    maxObjectWeight
){
    return {
        numberOfObjects,
        maxBagWeight,
        minObjectValue,
        maxObjectValue,
        minObjectWeight,
        maxObjectWeight
    }
}

module.exports = BagParameters;