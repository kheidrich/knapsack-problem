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

    describe('#selectParents', () => {
        beforeEach(() => {
            algorithm.algorithmParams.populationSize = 10;
        });

        it('should select round([populationSize * generationInterval / 100]) parents from the actual population when [populationSize * generationInterval / 100] is even', () => {
            algorithm.algorithmParams.generationInterval = 20;
            algorithm.selectParents();
            sinon.assert.calledWith(solutionMock.selection, algorithm.population, 2);
        });

        it('should select [round([populationSize * generationInterval / 100]) + 1] parents from the actual population when [populationSize * generationInterval / 100] is odd', () => {
            algorithm.algorithmParams.generationInterval = 50;
            algorithm.selectParents();
            sinon.assert.calledWith(solutionMock.selection, algorithm.population, 6);
        });

        it('should return the selected parents', () => {
            solutionMock.selection.returns([1, 2, 3, 4]);
            expect(algorithm.selectParents()).to.eql([1, 2, 3, 4]);
        });
    });

    describe('#crossover', () => {
        let parents;

        beforeEach(() => {
            parents = [
                [10, 7, 5, 8, 1],
                [8, 8, 9, 1, 6],
                [6, 8, 4, 5, 6],
                [9, 1, 6, 9, 6]
            ];
            algorithm.algorithmParams.crossoverRate = 50;
            sinon.stub(algorithm.utils, 'shouldDoSomething');
            algorithm.utils.shouldDoSomething.onFirstCall().returns(true);
            algorithm.utils.shouldDoSomething.onSecondCall().returns(false);
        });

        afterEach(() => {
            algorithm.utils.shouldDoSomething.restore();
        });

        it('should crossover parents in pairs with crossoverRate probability', () => {
            solutionMock.crossover.returns([parents[0], parents[1]]);
            algorithm.crossover(parents);
            sinon.assert.calledWith(solutionMock.crossover, parents[0], parents[1]);
            sinon.assert.alwaysCalledWith(algorithm.utils.shouldDoSomething, 50);
        });

        it('should swap the parents with the childs if they are crossed and keep the parents that does not have crossed', () => {
            let newParents;
            solutionMock.crossover.returns([[10, 7, 5, 1, 6], [8, 8, 9, 8, 1]]);

            newParents = algorithm.crossover(parents);

            expect(newParents).to.eql([
                [10, 7, 5, 1, 6],
                [8, 8, 9, 8, 1],
                [6, 8, 4, 5, 6],
                [9, 1, 6, 9, 6]
            ]);
        });
    });

    describe('#mutate', () => {
        let parents;

        beforeEach(() => {
            parents = [
                [10, 7, 5, 8, 1],
                [8, 8, 9, 1, 6],
                [6, 8, 4, 5, 6],
                [9, 1, 6, 9, 6]
            ];
            algorithm.algorithmParams.mutationRate = 50;
            sinon.stub(algorithm.utils, 'shouldDoSomething');
            parents.forEach((parent, index) => algorithm.utils.shouldDoSomething.onCall(index).returns(index % 2 === 0));
        });

        afterEach(() => {
            algorithm.utils.shouldDoSomething.restore();
        });

        it('should mutate the parents with mutationRate probability', () => {
            algorithm.mutate(parents);
            
            sinon.assert.calledWith(solutionMock.mutation, parents[0]);
            sinon.assert.calledWith(solutionMock.mutation, parents[2]);
            sinon.assert.alwaysCalledWith(algorithm.utils.shouldDoSomething, 50);
        });

        it('should swap the parent with the mutation if it is mutated and keep the parents that does not have mutated', () => {
            let mutated;
            solutionMock.mutation.callsFake(individual => individual.map(value => value % 2 === 0 ? ++value : --value));

            mutated = algorithm.mutate(parents);
            expect(mutated).to.eql([
                [11, 6, 4, 9, 0],
                [8, 8, 9, 1, 6],
                [7, 9, 5, 4, 7],
                [9, 1, 6, 9, 6]
            ]);
        });
    });
});