const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const KnapsackGaSolution = require('../src/knapsack-ga-solution');
const AlgorithmParameters = require('../src/algorithm-parameters');
const KnapsackParameters = require('../src/knapsack-parameters');

describe('KnapsackGaSolution', () => {
    const NUMBER_OF_OBJECTS = 10;
    const POPULATION_SIZE = 5;
    const MIN_OBJECT_VALUE = 1;
    const MAX_OBJECT_VALUE = 100;
    const MIN_OBJECT_WEIGHT = 1;
    const MAX_OBJECT_WEIGHT = 10;
    let solution;

    beforeEach(() => {
        solution = new KnapsackGaSolution(
            new KnapsackParameters(NUMBER_OF_OBJECTS, 100, MIN_OBJECT_VALUE, MAX_OBJECT_VALUE, MIN_OBJECT_WEIGHT, MAX_OBJECT_WEIGHT),
            new AlgorithmParameters(POPULATION_SIZE)
        );
    });

    describe('#initialize', () => {
        it('should generate N random objects with {value, weight} keys as configured in knapsackParameters', () => {
            solution.initialize();
            expect(solution.objects).to.have.length(NUMBER_OF_OBJECTS);
            solution.objects.forEach(object =>
                expect(object).to.have.keys(['value', 'weight'])
            );
        });

        it('should generate objects with value between min/max configured in knapsackParameters', () => {
            solution.initialize();
            solution.objects.forEach(object => {
                expect(object.value).to.be.least(MIN_OBJECT_VALUE);
                expect(object.value).to.be.most(MAX_OBJECT_VALUE);
            });
        });

        it('should generate objects with weight between min/max configured in knapsackParameters', () => {
            solution.initialize();
            solution.objects.forEach(object => {
                expect(object.weight).to.be.least(MIN_OBJECT_WEIGHT);
                expect(object.weight).to.be.most(MAX_OBJECT_WEIGHT);
            });
        });
    });

    describe('#generatePopulation', () => {
        let population;

        it('should return an array of length equals to algorithmParameters.populationSize', () => {
            population = solution.generatePopulation();
            expect(population).to.have.length(POPULATION_SIZE);
        });

        it('should fill population with knapsacks of length equals to knapsackParameters.numberOfObjects', () => {
            population = solution.generatePopulation();
            population.forEach(individual => expect(individual).to.have.length(NUMBER_OF_OBJECTS));
        });

        it('should fill all knapsacks using getRandomInt', () => {
            let objectsCreated = 0;

            sinon.stub(solution.utils, 'getRandomInt').callsFake(() => objectsCreated++);
            population = solution.generatePopulation();
            population.forEach((knapsack, knapsackIndex) => {
                knapsack.forEach((object, objectIndex) => {
                    expect(object).to.be.equal(knapsackIndex * NUMBER_OF_OBJECTS + objectIndex);
                });
            });
            solution.utils.getRandomInt.restore();
        });

        it('should fill all knapsacks randomly only with 0 or 1', () => {
            sinon.stub(solution.utils, 'getRandomInt');
            population = solution.generatePopulation();
            sinon.assert.alwaysCalledWith(solution.utils.getRandomInt, 0, 1);
            solution.utils.getRandomInt.restore();
        });
    });
});
