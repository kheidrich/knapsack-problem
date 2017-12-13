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
        this.finalPopulation = [];
        this.$scope = $scope
    }

    async solve() {
        const { populationSize, generationInterval, mutationRate } = this.geneticParameters;
        const { geneMutationRate } = this.geneticParameters;
        const { maxIterations } = this.stopCriteriaParameters;

        this.solutionStatus = 'solving';
        this.ModalService.openModal('solving-loader');
        await this.GeneticAlgorithmService.initialize(
            this.knapsackParameters,
            { populationSize, generationInterval, mutationRate },
            { geneMutationRate }
        )
        this.initialPopulation = await this.GeneticAlgorithmService.getActualPopulation();
        await this.GeneticAlgorithmService.solve(maxIterations, 0);
        this.finalPopulation = await this.GeneticAlgorithmService.getActualPopulation();
        this.ModalService.closeModal('solving-loader');
        this.solutionStatus = 'solved';
        this.$scope.$digest();
    }

   async reset(){
       this.initialPopulation = [];
       this.finalPopulation = [];
       this.solutionStatus = 'configuring';
   }
}

export default {
    template,
    controller: AppComponent,
    controllerAs: 'App'
}