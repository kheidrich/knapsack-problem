import template from './app.component.html';
import KnapsackGaSolution from '../core/knapsack-ga-solution';
import GeneticAlgorithm from '../core/genetic-algorithm';

class AppComponent {
    constructor(
        ModalService,
        GeneticAlgorithmService
    ) {
        this.ModalService = ModalService;
        this.GeneticAlgorithmService = GeneticAlgorithmService;
        this.solutionStatus = 'configuring';
    }

    updateParameters() {
        // console.log(this.geneticParameters);
    }

    async startSolution() {
        const { populationSize, generationInterval, mutationRate } = this.geneticParameters;
        const { geneMutationRate } = this.geneticParameters;

        await this.GeneticAlgorithmService.initialize(
            this.knapsackParameters,
            { populationSize, generationInterval, mutationRate },
            { geneMutationRate }
        )

        this.solutionStatus = 'solving';
        this.ModalService.openModal('comp');

        ga.initialize();
        this.initialPopulation = ga.population.map(knapsack => this.SolutionInfoService.getKnapsackSummary([...knapsack], Object.assign({}, solution.objects)));

        this.ModalService.closeModal('comp');
        this.solutionStatus = 'solved';

        return;

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