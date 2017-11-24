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
});
