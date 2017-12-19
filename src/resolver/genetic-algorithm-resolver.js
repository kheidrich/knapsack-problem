import GeneticAlgorithm from '../core/genetic-algorithm';
import KnapsackGaSolution from '../core/knapsack-ga-solution';
import { ipcRenderer } from 'electron';

let solution;
let ga;

ipcRenderer.on('execute-resolver-method', async (event, { senderId, method, params }) => {
    try {
        let reply;

        reply = await eval(`${method}`)(...params);
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

function getObjects() {
    return [...solution.objects];
}

async function solve(maxIterations, optimalStabilization) {
    let iterations = 0;
    let validateMaxIterations = maxIterations > 0;
    let validateStabilization = optimalStabilization > 0;
    let stabilization = 0;
    let parents;
    let lastOptimal = 0;

    console.log(optimalStabilization)

    while (!maxIterationsReached() && !stabilized()) {
        await new Promise((resolve) => {
            let evolve = setTimeout(() => {
                ga.updateOptimal();
                parents = ga.selectParents();
                parents = ga.crossover(parents);
                parents = ga.mutate(parents);
                ga.substitute(parents);
                iterations++;
                if (lastOptimal === ga.actualOptimal) stabilization++;
                else {
                    lastOptimal = ga.actualOptimal;
                    stabilization = 0;
                }
                let populationFitness = ga.population
                    .filter((k, index) => (index + 1) % 5 === 0)
                    .map(knapsack => getKnapsackSummary(knapsack).fitness);
                ipcRenderer.send('solve-update', { populationFitness, iterations, stabilization });
                resolve(evolve)
            },
                100);
        })
            .then(clearTimeout);
    }

    function maxIterationsReached(){
        return iterations >= maxIterations;
    }

    function stabilized(){
        return stabilization >= optimalStabilization;
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