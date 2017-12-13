import template from './population-details.component.html';

class PopulationDetailsComponent {
    constructor(GeneticAlgorithmService, ModalService, $scope, $element) {
        this.GeneticAlgorithmService = GeneticAlgorithmService;
        this.ModalService = ModalService;

        this.worstKnapsack = [];
        this.bestKnapsack = [];
        this.worstKnapsackSummary = {};
        this.bestKnapsackSummary = {};
        this.chartPopulation = [];
        this.chartData = [];
        this.$scope = $scope;
        this.$element = $element;

        this.bubbleClicked = ([bubble], event) => {
            if (!bubble) return;
            this.knapsackDetails(this.chartPopulation[bubble._index]);
        }
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
        this.chartPopulation = [];
        for (let knapsack of this.population.filter((knapsack, index) => (index + 1) % 20 === 0))
            this.chartPopulation.push(knapsack);
    }

    async setChartData() {
        this.chartData = [];
        for (let index in this.chartPopulation) {
            let summary = await this.GeneticAlgorithmService.getKnapsackSummary(this.chartPopulation[+index]);
            let data = { x: +index, y: summary.fitness, r: summary.objects / 1.5 };

            this.chartData.push(data);
        }
    }

    async knapsackDetails(knapsack) {
        this.knapsackSelected = {};
        this.knapsackSelected = await this.GeneticAlgorithmService.getKnapsackSummary(knapsack);
        this.knapsackSelected.objectsList = await this.GeneticAlgorithmService.getKnapsackObjects(knapsack);
        this.$scope.$digest();
        this.ModalService.openModal('knapsack-details', this.$element);
    }
}

export default {
    template,
    controller: PopulationDetailsComponent,
    controllerAs: 'PopulationDetails',
    bindings: {
        population: '<',
        name: '@'
    }
};