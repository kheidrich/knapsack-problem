import GeneticAlgorithm from '../core/genetic-algorithm';
import KnapsackGaSolution from '../core/knapsack-ga-solution';
import { ipcRenderer } from 'electron';

let solution;
let ga;

ipcRenderer.on('execute-resolver-method', (event, { method, params }) => {
    try {
        let reply;

        reply = eval(`${method}`)(...params);
        ipcRenderer.send('resolver-reply', { status: 'ok', data: reply });
    }
    catch(error) {
        ipcRenderer.send('resolver-reply', { status: 'error', error });
    }
})

function initialize(knapsackParams, algorithmParams, geneticOperatorsParams) {
    solution = new KnapsackGaSolution(knapsackParams, geneticOperatorsParams);
    ga = new GeneticAlgorithm(solution, algorithmParams);

    ga.initialize();
}


