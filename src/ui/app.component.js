import template from './app.component.html';
import KnapsackGaSolution from '../core/knapsack-ga-solution';
import GeneticAlgorithm from '../core/genetic-algorithm';

class AppComponent {
    constructor(ModalService) {
        this.ModalService = ModalService;
        this.solutionStatus = 'configuring';
    }

    updateParameters() {
        console.log(this.geneticParameters);
    }

    startSolution() {
        const { populationSize, generationInterval, mutationRate } = this.geneticParameters;
        const { geneMutationRate } = this.geneticParameters;
        let solution = new KnapsackGaSolution(this.knapsackParameters, { geneMutationRate });
        let ga = new GeneticAlgorithm(solution, { populationSize, generationInterval, mutationRate });


        this.solutionStatus = 'solving';
        ga.initialize();
        this.initialPopulation = [...ga.population];
        this.ModalService.openModal('comp');

        let iterations = 0;
        let population;
        let parents;

        while (iterations < 100) {
            ga.updateOptimal();
            parents = ga.selectParents();
            parents = ga.crossover([...parents]);
            parents = ga.mutate([...parents]);
            ga.substitute(parents);
            iterations++;
        }

        this.finalPopulation = [...ga.population];
        this.optimalHistory = [...ga.optimalHistory];
        this.ModalService.closeModal('comp');
        this.solutionStatus = 'solved';
    }
}

export default {
    template,
    controller: AppComponent,
    controllerAs: 'App'
}