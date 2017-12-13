import template from './population-details.component.html';

let vm;
class PopulationDetailsComponent {
    constructor(GeneticAlgorithmService, ModalService, $scope) {
        this.GeneticAlgorithmService = GeneticAlgorithmService;
        this.ModalService = ModalService;

        this.worstKnapsack = [];
        this.bestKnapsack = [];
        this.worstKnapsackSummary = {};
        this.bestKnapsackSummary = {};
        this.populationSummary = [];
        this.$scope = $scope;

        this.chart = [
            { x: 0, y: 300, r: 10 },
            { x: 1, y: 500, r: 10 },
            { x: 2, y: 350, r: 10 },
            { x: 3, y: 280, r: 10 },
            { x: 4, y: 400, r: 10 }
        ];

        vm = this;
    }

    async $onChanges() {
        if (this.population && this.population.length > 0) {
            this.worstKnapsack = await this.GeneticAlgorithmService.getWorstKnapsack(this.population);
            this.worstKnapsackSummary = await this.GeneticAlgorithmService.getKnapsackSummary(this.worstKnapsack);

            this.bestKnapsack = await this.GeneticAlgorithmService.getBestKnapsack(this.population);
            this.bestKnapsackSummary = await this.GeneticAlgorithmService.getKnapsackSummary(this.bestKnapsack);

            for (let knapsack of this.population.filter((knapsack, index) => index % 10 === 0))
                this.populationSummary.push(await this.GeneticAlgorithmService.getKnapsackSummary(knapsack));

            this.chart = this.populationSummary.map((summary, index) => ({ x: index, y: summary.fitness, r: summary.objects / 2.5 }))

            this.$scope.$digest();
        }
    }

    bubbleClicked([bubble], event) {
        vm.knapsackDetails(vm.populationSummary[bubble._index]);
        vm.$scope.$digest();
    }

    knapsackDetails(knapsack){
        vm.knapsackSelected = knapsack;
        vm.ModalService.openModal('knapsack-details');
    }
}

export default {
    template,
    controller: PopulationDetailsComponent,
    controllerAs: 'PopulationDetails',
    bindings: {
        population: '<'
    }
}