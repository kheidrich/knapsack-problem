const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const GeneticAlgorithm = require('../src/genetic-algorithm');
const AlgorithmParameters = require('../src/algorithm-parameters');
const ObjectGerationParameters = require('../src/object-generation-parameters');

describe('GeneticAlgorithm', () => {
    let algorithm;

    beforeEach(() => {
        algorithm = new GeneticAlgorithm(
            new ObjectGerationParameters(5, 100, 1, 100, 1, 10),
            new AlgorithmParameters(10)
        );
    });

    describe('#initialize', () => {
        it('should generate a population with length equal populationSize in algorithmParameters', () => {
            algorithm.initialize();
            expect(algorithm.population).to.have.length(10);
        });

        it('every population individual should have length equal numberOfObjects in generationParameters', () => {
            algorithm.initialize();
            expect(algorithm.population.every(individual => individual.length === 5)).to.be.true;
        });

        it('should generate random objects with {value, weight} keys', () => {
            algorithm.initialize();
            algorithm.population.forEach(individual =>
                individual.forEach(object =>
                    expect(object).to.have.keys(['value', 'weight'])
                )
            );
        })
    });
});
