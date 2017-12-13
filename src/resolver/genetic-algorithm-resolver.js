import GeneticAlgorithm from '../core/genetic-algorithm';
import KnapsackGaSolution from '../core/knapsack-ga-solution';
import { ipcRenderer } from 'electron';

let solution;
let ga;

ipcRenderer.on('execute-resolver-method', (event, { senderId, method, params }) => {
    try {
        let reply;

        reply = eval(`${method}`)(...params);
        ipcRenderer.send(`resolver-reply`, { status: 'ok', data: reply, senderId });
    }
    catch (error) {
        console.log(error);
        ipcRenderer.send('resolver-reply', { status: 'error', error: error.message, senderId });
    }
})

function initialize(knapsackParams, algorithmParams, geneticOperatorsParams) {
    solution = new KnapsackGaSolution(knapsackParams, geneticOperatorsParams);
    ga = new GeneticAlgorithm(solution, algorithmParams);

    ga.initialize();
}

function getActualPopulation() {
    return [...ga.population];
}

function getObjects(){
    return [...solution.objects];
}

function solve(maxIterations, optimalEstabilization) {
    let iterations = 0;
    let parents;

    while (iterations < maxIterations) {
        ga.updateOptimal();
        parents = ga.selectParents();
        parents = ga.crossover(parents);
        parents = ga.mutate(parents);
        ga.substitute(parents);
        iterations++;
    }
}

function getKnapsackObjects(knapsack) {
    return knapsack.reduce((objects, hasObject, index) => {
        if (hasObject)
            objects.push(Object.assign({ id: index }, solution.objects[index]));

        return objects;
    }, []);
}

function getKnapsackSummary(knapsack) {
    let fitness = solution.fitness(knapsack);
    
    return knapsack.reduce((summary, hasObject, index) => {
        if (hasObject) {
            summary.value += solution.objects[+index].value;
            summary.weight += solution.objects[+index].weight;
            summary.fitness = fitness;
            summary.objects++;
        }
        return summary;
    },
        { weight: 0, value: 0, objects: 0, fitness: 0 }
    )
}

function getWorstKnapsack(population) {
    return population.sort((a, b) => solution.fitness(a) - solution.fitness(b))[0];
}

function getBestKnapsack(population) {
    return population.sort((a, b) => solution.fitness(a) - solution.fitness(b))[population.length - 1];
}