const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const KnapsackGaSolution = require('../src/knapsack-ga-solution');
const AlgorithmParameters = require('../src/algorithm-parameters');
const KnapsackParameters = require('../src/knapsack-parameters');

describe('KnapsackGaSolution', () => {
    const NUMBER_OF_OBJECTS = 10;
    const POPULATION_SIZE = 5;
    const MAX_KNAPSACK_WEIGHT = 30;
    const MIN_OBJECT_VALUE = 1;
    const MAX_OBJECT_VALUE = 100;
    const MIN_OBJECT_WEIGHT = 1;
    const MAX_OBJECT_WEIGHT = 10;
    let solution;

    beforeEach(() => {
        solution = new KnapsackGaSolution(
            new KnapsackParameters(NUMBER_OF_OBJECTS, MAX_KNAPSACK_WEIGHT, MIN_OBJECT_VALUE, MAX_OBJECT_VALUE, MIN_OBJECT_WEIGHT, MAX_OBJECT_WEIGHT),
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

        it('should generate objects with "value" between min/max configured in knapsackParameters', () => {
            solution.initialize();
            solution.objects.forEach(object => {
                expect(object.value).to.be.least(MIN_OBJECT_VALUE);
                expect(object.value).to.be.most(MAX_OBJECT_VALUE);
            });
        });

        it('should generate objects with "weight" between min/max configured in knapsackParameters', () => {
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

    describe('#fitness', () => {

        beforeEach(() => {
            solution.objects = [
                { value: 70, weight: 3 },
                { value: 30, weight: 2 },
                { value: 75, weight: 10 },
                { value: 20, weight: 10 },
                { value: 25, weight: 10 }
            ]
        })

        it('should return (totalValue / totalWeight) when knapsack weight is less than maxKnapsackWeight', () => {
            let knapsack = [1, 1, 0, 0, 0];

            expect(solution.fitness(knapsack)).to.be.equal(20);
        });

        it('should return (totalValue / totalWeight when knapsack weight is equal to maxKnapsackWeight', () => {
            let knapsack = [0, 0, 1, 1, 1];

            expect(solution.fitness(knapsack)).to.be.equal(4);
        });

        it('should return 0 when knapsack weight is higher than maxKnapsackWeight', () => {
            let knapsack = [0, 1, 1, 1, 1];

            expect(solution.fitness(knapsack)).to.be.equal(0);
        })
    });

    describe('#crossover', () => {
        let knapsack1, knapsack2;

        beforeEach(() => {
            knapsack1 = [1, 0, 1, 0, 1];
            knapsack2 = [0, 1, 0, 0, 1];
            sinon.stub(solution.utils, 'getRandomInt').returns(2);
        });

        afterEach(() => {
            solution.utils.getRandomInt.restore();
        });

        it('should generate two childs swapping the parents genes after the choosed cut point', () => {
            let [child1, child2] = solution.crossover(knapsack1, knapsack2);

            expect(child1).to.eql([1, 0, 0, 0, 1]);
            expect(child2).to.eql([0, 1, 1, 0, 1]);
            solution.utils.getRandomInt.reset();
        });

        it('should choose a cut point between 1 and [knapsack_length - 2]', () => {
            solution.crossover(knapsack1, knapsack2);
            sinon.assert.alwaysCalledWith(solution.utils.getRandomInt, 1, 3);
        });
    });
});
