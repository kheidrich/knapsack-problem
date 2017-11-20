const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const KnapsackGaSolution = require('../src/knapsack-ga-solution');
const AlgorithmParameters = require('../src/algorithm-parameters');
const KnapsackParameters = require('../src/knapsack-parameters');

describe('KnapsackGaSolution', () => {
    let solution;

    beforeEach(() => {
        solution = new KnapsackGaSolution(
            new KnapsackParameters(30, 100, 1, 100, 1, 10),
            new AlgorithmParameters(100)
        );
    });

    describe('#initialize', () => {
        it('should generate N random objects with {value, weight} keys as configured in knapsackParameters', () => {
            solution.initialize();
            expect(solution.objects).to.have.length(30);
            solution.objects.forEach(object => expect(object).to.have.keys(['value', 'weight']));
        });
    });

    describe('#generatePopulation', () => {
        let population;

        beforeEach(() => {
            population = solution.generatePopulation();
        });

        it('should return a array with length equals to algorithmParameters.populationSize', () => {
            expect(population).to.have.length(100);
        });

        it('individuals should have length equals to knapsackParameters.numberOfObjects', () => {
            population.forEach(individual => expect(individual).to.have.length(30));
        });

        it('individuals should be random filled with 1 or 0');
    });
});
