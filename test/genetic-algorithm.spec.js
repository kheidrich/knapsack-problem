const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const GeneticAlgorithm = require('../src/genetic-algorithm');
const AlgorithmParameters = require('../src/algorithm-parameters');

describe('GeneticAlgorithm', () => {
    let algorithm;
    let solutionMock;

    beforeEach(() => {
        solutionMock = {
            initialize: sinon.stub(),
            generatePopulation: sinon.stub(),
            fitness: sinon.stub().callsFake((individual) => individual.reduce((sum, value) => sum + value, 0)),
            selection: sinon.stub(),
            crossover: sinon.stub(),
            mutation: sinon.stub(),
            substitution: sinon.stub()
        };
        algorithm = new GeneticAlgorithm(solutionMock, new AlgorithmParameters());
    });

    describe('#initialize', () => {
        it('should initialize the solution', () => {
            algorithm.initialize();
            sinon.assert.called(solutionMock.initialize);
        });

        it('should generate a population passing the size', () => {
            algorithm.algorithmParams.populationSize = 10;
            algorithm.initialize();
            sinon.assert.calledWith(solutionMock.generatePopulation, 10);
        });

        it('should initialize its population', () => {
            solutionMock.generatePopulation.returns([0, 1, 2, 3]);
            algorithm.initialize();
            expect(algorithm.population).to.eql([0, 1, 2, 3]);
        });
    });

    describe('#updateOptimal', () => {
        beforeEach(() => {
            algorithm.population = [
                [3, 2, 1],
                [4, 5, 6],
                [1, 2, 4]
            ];
        });

        it('should find the optimal fitness from actual population and set as actual optimal', () => {
            algorithm.updateOptimal();
            expect(algorithm.actualOptimal).to.eql([4, 5, 6]);
        });

        it('should add actual optimal to optimal history', () => {
            algorithm.updateOptimal();
            expect(algorithm.optimalHistory).to.contains(algorithm.actualOptimal);
        });
    });

    describe('#stopCriteriaReached', () => {
        describe('max iterations higher than 0 and optimal estabilization equals to 0', () => {
            it('should return true when iterations is equal to maxIterations', () => {
                algorithm.algorithmParams.maxIterations = 5;
                algorithm.algorithmParams.optimalStabilization = 0;
                algorithm.iterations = 5;
                expect(algorithm.stopCriteriaReached()).to.be.true;
            });

            it('should return false when iterations is not equal to maxIterations', () => {
                algorithm.algorithmParams.maxIterations = 5;
                algorithm.algorithmParams.optimalStabilization = 0;
                algorithm.iterations = 4;
                expect(algorithm.stopCriteriaReached()).to.be.false;
            });
        });

        describe('optimal estabilization higher than 0 and max iterations equals to 0', () => {
            it('should return true when the last [optimalEstabilitazion] optimals are equal to actual optimal', () => {
                algorithm.algorithmParams.optimalStabilization = 5;
                algorithm.algorithmParams.maxIterations = 0;
                algorithm.optimalHistory = [0, 5, 5, 5, 5, 5];
                algorithm.actualOptimal = 5;
                expect(algorithm.stopCriteriaReached()).to.be.true;
            });

            it('should return false when the last [optimalEstabilitazion] optimals are not equal to actual optimal', () => {
                algorithm.algorithmParams.optimalStabilization = 5;
                algorithm.algorithmParams.maxIterations = 0;
                algorithm.optimalHistory = [0, 5, 5, 5, 5, 3];
                algorithm.actualOptimal = 3;
                expect(algorithm.stopCriteriaReached()).to.be.false;
            });
        });
    });
});
