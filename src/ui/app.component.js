import template from './app.component.html';
import KnapsackGaSolution from '../core/knapsack-ga-solution';
import GeneticAlgorithm from '../core/genetic-algorithm';

class AppComponent {
    constructor(
        ModalService,
        GeneticAlgorithmService,
        $scope
    ) {
        this.ModalService = ModalService;
        this.GeneticAlgorithmService = GeneticAlgorithmService;
        this.solutionStatus = 'configuring';
        this.initialPopulation = [];
        this.$scope = $scope
    }

    updateParameters() {
        // console.log(this.geneticParameters);
    }

    async startSolution() {
        const { populationSize, generationInterval, mutationRate } = this.geneticParameters;
        const { geneMutationRate } = this.geneticParameters;

        this.solutionStatus = 'solving';

        await this.GeneticAlgorithmService.initialize(
            this.knapsackParameters,
            { populationSize, generationInterval, mutationRate },
            { geneMutationRate }
        )
        this.initialPopulation = await this.GeneticAlgorithmService.getActualPopulation();

        // this.ModalService.openModal('comp');

        // this.ModalService.closeModal('comp');
        this.solutionStatus = 'solved';
        this.$scope.$digest();
    }
}

export default {
    template,
    controller: AppComponent,
    controllerAs: 'App'
}