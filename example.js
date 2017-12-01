const GeneticAlgorithm = require('./src/genetic-algorithm');
const KnapsackGaSolution = require('./src/knapsack-ga-solution');
const KnapsackParameters = require('./src/knapsack-parameters');
const GeneticOperatorsParameters = require('./src/genetic-operators-parameters');
const AlgorithmParameters = require('./src/algorithm-parameters');

const populationSize = 20;
const generationInterval = 10;
const crossoverRate = 40;
const mutationRate = 40;

const maxtIterations = 100;

const numOfObjects = 20;
const maxKnapsackWeight = 50;
const geneMutationRate = 20;

let solution = new KnapsackGaSolution(
    new KnapsackParameters(numOfObjects, maxKnapsackWeight, 1, 100, 1, 10),
    new GeneticOperatorsParameters(geneMutationRate)
);
let algorithm = new GeneticAlgorithm(solution, new AlgorithmParameters(populationSize, mutationRate, crossoverRate, generationInterval, maxtIterations, 0));
let iterations = 0;


algorithm.initialize();
// console.log(algorithm.population.map(v => solution.fitness(v)));
// console.log(algorithm.population)
solution.objects = [
    { value: 20, weight: 1 },
    { value: 15, weight: 7 },
    { value: 30, weight: 2 },
    { value: 63, weight: 2 },
    { value: 82, weight: 10 },
    { value: 14, weight: 3 },
    { value: 35, weight: 8 },
    { value: 82, weight: 6 },
    { value: 56, weight: 3 },
    { value: 72, weight: 9 },
    { value: 1, weight: 5 },
    { value: 42, weight: 1 },
    { value: 79, weight: 7 },
    { value: 59, weight: 4 },
    { value: 77, weight: 8 },
    { value: 10, weight: 5 },
    { value: 95, weight: 5 },
    { value: 25, weight: 2 },
    { value: 18, weight: 7 },
    { value: 22, weight: 8 }
];
while (iterations < maxtIterations) {
    algorithm.updateOptimal();
    let parents = algorithm.selectParents();
    parents = algorithm.crossover([...parents]);
    parents = algorithm.mutate([...parents]);
    algorithm.substitute([...parents]);
    iterations++;
}

// console.log(algorithm.population.map(v => solution.fitness(v)));
// console.log(algorithm.population)
// console.log(algorithm.optimalHistory)
console.log(algorithm.actualOptimal);