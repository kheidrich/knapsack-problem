import GeneticAlgorithm from '../core/genetic-algorithm';


const ipcRenderer = eval('require("electron").ipcRenderer')

ipcRenderer.on('ui-message', (e, arg) => {
    console.log(arg);
})

ipcRenderer.send('genetic-algorithm-resolver-message', 'deu cer  sto');

// let solution;
// let ga;

// console.log('aqui')

// let onmessage = ({ data }) => {
//     let iterations = 0;

//     eval(`${data.method}`)(...data.params);
// }

// function initialize(knapsackParams, algorithmParams, geneticOperatorsParams) {
//     console.log(knapsackParams, algorithmParams, geneticOperatorsParams)
// }