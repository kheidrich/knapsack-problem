const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const KnapsackGaSolution = require('../src/knapsack-ga-solution');
const AlgorithmParameters = require('../src/algorithm-parameters');
const KnapsackParameters = require('../src/knapsack-parameters');

describe('KnapsackGaSolution', () => {
    const NUMBER_OF_OBJECTS = 5;
    const POPULATION_SIZE = 5;
    const GENERATION_INTERVAL = 3;
    const MAX_KNAPSACK_WEIGHT = 30;
    const MIN_OBJECT_VALUE = 1;
    const MAX_OBJECT_VALUE = 100;
    const MIN_OBJECT_WEIGHT = 1;
    const MAX_OBJECT_WEIGHT = 10;
    let solution;

    beforeEach(() => {
        solution = new KnapsackGaSolution(
            new KnapsackParameters(NUMBER_OF_OBJECTS, MAX_KNAPSACK_WEIGHT, MIN_OBJECT_VALUE, MAX_OBJECT_VALUE, MIN_OBJECT_WEIGHT, MAX_OBJECT_WEIGHT)
        );
    });

    describe('#initialize', () => {
        it('should generate N random objects with {value, weight} keys as configured in knapsackParams', () => {
            solution.initialize();
            expect(solution.objects).to.have.length(NUMBER_OF_OBJECTS);
            solution.objects.forEach(object =>
                expect(object).to.have.keys(['value', 'weight'])
            );
        });

        it('should generate objects with "value" between min/max configured in knapsackParams', () => {
            solution.initialize();
            solution.objects.forEach(object => {
                expect(object.value).to.be.least(MIN_OBJECT_VALUE);
                expect(object.value).to.be.most(MAX_OBJECT_VALUE);
            });
        });

        it('should generate objects with "weight" between min/max configured in knapsackParams', () => {
            solution.initialize();
            solution.objects.forEach(object => {
                expect(object.weight).to.be.least(MIN_OBJECT_WEIGHT);
                expect(object.weight).to.be.most(MAX_OBJECT_WEIGHT);
            });
        });
    });

    describe('#generatePopulation', () => {
        let population;

        beforeEach(() => {
            population = [];
        });

        it('should return an array of length equals to the size passed', () => {
            population = solution.generatePopulation(POPULATION_SIZE);
            expect(population).to.have.length(POPULATION_SIZE);
        });

        it('should fill population with knapsacks of length equals to knapsackParams.numberOfObjects', () => {
            let allKnapsacksOk = false;

            population = solution.generatePopulation(POPULATION_SIZE);
            allKnapsacksOk = population.reduce((ok, individual) => (individual.length === NUMBER_OF_OBJECTS));
            expect(allKnapsacksOk).to.be.true;
        });

        it('should fill all knapsacks using getRandomInt', () => {
            let objectsCreated = 0;
            let expectedPopulation = [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
                [15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24]
            ];

            sinon.stub(solution.utils, 'getRandomInt').callsFake(() => objectsCreated++);
            population = solution.generatePopulation(POPULATION_SIZE);
            expect(population).to.eql(expectedPopulation);
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

        it('should return (totalValue / totalWeight) when knapsack weight is lower than maxKnapsackWeight', () => {
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

    describe('#selection', () => {
        let population;

        beforeEach(() => {
            solution.objects = [
                { value: 70, weight: 8 },
                { value: 30, weight: 2 },
                { value: 75, weight: 10 },
                { value: 20, weight: 10 },
                { value: 25, weight: 15 }
            ];
            population = solution.generatePopulation();
        });

        it('should return an array of length equals to algorithmParams.generationInterval', () => {
            expect(solution.selection(population)).to.have.length(GENERATION_INTERVAL);
        });

        it('should compare the selected individuals in pairs and keep the first when it have best fitness', () => {
            solution.algorithmParams.generationInterval = 1;

            let individuals = [
                [0, 1, 1, 0, 0],
                [0, 0, 1, 1, 1]
            ];

            sinon.stub(solution.utils, 'selectRandomItem');
            individuals.forEach((item, index) => solution.utils.selectRandomItem.onCall(index).returns(item));

            expect(solution.selection(population)).to.eql([individuals[0]]);
            solution.utils.selectRandomItem.restore();
        });

        it('should compare the selected individuals in pairs and keep the second when it have best fitness', () => {
            solution.algorithmParams.generationInterval = 1;

            let individuals = [
                [0, 0, 1, 1, 1],
                [0, 1, 1, 0, 0]
            ];

            sinon.stub(solution.utils, 'selectRandomItem');
            individuals.forEach((item, index) => solution.utils.selectRandomItem.onCall(index).returns(item));

            expect(solution.selection(population)).to.eql([individuals[1]]);
            solution.utils.selectRandomItem.restore();
        });
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

        it('should generate two childs swapping the parents genes from the choosed cut point', () => {
            let [child1, child2] = solution.crossover(knapsack1, knapsack2);

            expect(child1).to.eql([1, 0, 0, 0, 1]);
            expect(child2).to.eql([0, 1, 1, 0, 1]);
            solution.utils.getRandomInt.reset();
        });
    });
});
