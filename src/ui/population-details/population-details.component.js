import template from './population-details.component.html';

class PopulationDetailsComponent {
    constructor(GeneticAlgorithmService, $scope) {
        this.GeneticAlgorithmService = GeneticAlgorithmService;
        this.worstKnapsack = [];
        this.bestKnapsack = [];
        this.worstKnapsackSummary = {};
        this.bestKnapsackSummary = {};
        this.populationSummary = [];
        this.$scope = $scope;
    }

    async $onChanges() {
        if (this.population && this.population.length) {
            this.worstKnapsack = await this.GeneticAlgorithmService.getWorstKnapsack(this.population);
            this.worstKnapsackSummary = await this.GeneticAlgorithmService.getKnapsackSummary(this.worstKnapsack);

            this.bestKnapsack = await this.GeneticAlgorithmService.getBestKnapsack(this.population);
            this.bestKnapsackSummary = await this.GeneticAlgorithmService.getKnapsackSummary(this.bestKnapsack);

            this.chart = [];
            for (let knapsack of this.population)
                this.chart.push(await this.GeneticAlgorithmService.getKnapsackSummary(knapsack));
            this.chart = this.chart
                .filter((knapsack, index) => index % 10 === 0)
                .map((summary, index) => ({ x: index, y: summary.fitness, r: summary.objects / 2.5 }))

            this.$scope.$digest();
        }
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