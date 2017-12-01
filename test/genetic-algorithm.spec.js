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

        it('should find the optimal fitness from actual population and set fitness value as actual optimal', () => {
            algorithm.updateOptimal();
            expect(algorithm.actualOptimal).to.eql(15);
        });

        it('should add actual optimal to optimal history', () => {
            algorithm.updateOptimal();
            expect(algorithm.optimalHistory).to.contains(algorithm.actualOptimal);
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
        });

        it('should crossover parents in pairs', () => {
            solutionMock.crossover.returns([]);
            algorithm.crossover(parents);
            sinon.assert.calledWith(solutionMock.crossover, parents[0], parents[1]);
            sinon.assert.calledWith(solutionMock.crossover, parents[2], parents[3]);
        });

        it('should swap the parents with the childs of the crossover', () => {
            let newParents;
            solutionMock.crossover.onFirstCall().returns([
                [10, 7, 5, 1, 6],
                [8, 8, 9, 8, 1]
            ]);
            solutionMock.crossover.onSecondCall().returns([
                [6, 8, 4, 9, 6],
                [9, 1, 6, 5, 6]
            ]);

            newParents = algorithm.crossover(parents);

            expect(newParents).to.eql([
                [10, 7, 5, 1, 6],
                [8, 8, 9, 8, 1],
                [6, 8, 4, 9, 6],
                [9, 1, 6, 5, 6]
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
            sinon.stub(algorithm.utils, 'getRandomInt');
            algorithm.utils.getRandomInt.onFirstCall().returns(0);
            algorithm.utils.getRandomInt.onSecondCall().returns(2);
        });

        afterEach(() => {
            algorithm.utils.getRandomInt.restore();
        });

        it('should mutate mutationRate% of the parents randomly', () => {
            algorithm.mutate(parents);

            sinon.assert.calledWith(solutionMock.mutation, parents[0]);
            sinon.assert.calledWith(solutionMock.mutation, parents[2]);
            sinon.assert.calledTwice(algorithm.utils.getRandomInt);
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

    describe('#substitute', () => {
        let parents, population;

        beforeEach(() => {
            parents = [
                [10, 7, 5, 8, 1],
                [8, 8, 9, 1, 6],
                [6, 8, 4, 5, 6],
                [9, 1, 6, 9, 6]
            ];
            population = [
                [4, 9, 7, 8, 1],
                [1, 6, 1, 4, 8],
                [2, 4, 8, 10, 5],
                [8, 8, 8, 2, 10],
                [1, 7, 4, 4, 6],
                [9, 8, 5, 2, 6],
                [7, 8, 9, 3, 8],
                [6, 10, 1, 4, 6],
                [2, 0, 3, 7, 0],
                [7, 9, 0, 7, 5]
            ]
        });

        it('should substitute population individuals with the parents', () => {
            algorithm.population = population;
            algorithm.substitute(parents);
            sinon.assert.calledWith(solutionMock.substitution, parents, population);
        });

        it('should set the new population', () => {
            let newPopulation = [...population];
            parents.forEach((parent, index) => newPopulation[index] = parent);

            solutionMock.substitution.returns(newPopulation);
            algorithm.substitute(parents);
            expect(algorithm.population).to.eql(newPopulation);
        });
    });
});

console.log((new Array(10)).fill((new Array(5).fill([]))).map(v => v.map(x => Math.round(Math.random() * 10))));