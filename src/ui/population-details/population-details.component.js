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
        this.chartPopulation = [];
        this.chartData = [];
        this.$scope = $scope;

        vm = this;
    }

    async $onChanges() {
        if (this.population && this.population.length > 0) {
            await this.setWorstKnapsack();
            await this.setBestKnapsack();
            await this.setChartPopulation();
            await this.setChartData();
            this.$scope.$digest();
        }
    }

    async setWorstKnapsack() {
        this.worstKnapsack = await this.GeneticAlgorithmService.getWorstKnapsack(this.population);
        this.worstKnapsackSummary = await this.GeneticAlgorithmService.getKnapsackSummary(this.worstKnapsack);
    }

    async setBestKnapsack() {
        this.bestKnapsack = await this.GeneticAlgorithmService.getBestKnapsack(this.population);
        this.bestKnapsackSummary = await this.GeneticAlgorithmService.getKnapsackSummary(this.bestKnapsack);
    }

    async setChartPopulation() {
        for (let knapsack of this.population.filter((knapsack, index) => index % 10 === 0))
            this.chartPopulation.push(knapsack);
    }

    async setChartData() {
        for (let index in this.chartPopulation) {
            let summary = await this.GeneticAlgorithmService.getKnapsackSummary(this.chartPopulation[+index]);
            let data = { x: +index, y: summary.fitness, r: summary.objects / 2.5 };

            this.chartData.push(data);
        }
    }

    bubbleClicked([bubble], event) {
        if (!bubble) return;
        vm.knapsackDetails(vm.chartPopulation[bubble._index]);
    }

    async knapsackDetails(knapsack) {
        vm.knapsackSelected = await this.GeneticAlgorithmService.getKnapsackSummary(knapsack);
        vm.knapsackSelected.objectsList = await this.GeneticAlgorithmService.getKnapsackObjects(knapsack);
        vm.$scope.$digest();
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