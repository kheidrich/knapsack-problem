import template from './population-details.component.html';

class PopulationDetailsComponent {
    constructor(GeneticAlgorithmService) {
        this.GeneticAlgorithmService = GeneticAlgorithmService;
        this.worstKnapsack = [];
        this.bestKnapsack = [];
        this.worstKnapsackSummary = {};
        this.bestKnapsackSummary = {};
        this.populationSummary = [];
    }

    $onChanges() {
        if (this.population && this.population.length) {
            this.worstKnapsack = this.GeneticAlgorithmService.getWorstKnapsack(this.population);
            this.worstKnapsackSummary = this.GeneticAlgorithmService.getKnapsackSummary(this.worstKnapsack);
            this.bestKnapsack = this.GeneticAlgorithmService.getBestKnapsack(this.population);
            this.bestKnapsackSummary = this.GeneticAlgorithmService.getKnapsackSummary(this.bestKnapsack);
            this.chart = this.population
                .map(knapsack => this.GeneticAlgorithmService.getKnapsackSummary(knapsack))
                .filter((knapsack, index) => index % 10 === 0)
                .map((summary, index) => ({ x: index, y: summary.fitness, r: summary.objects / 2.5 }))
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