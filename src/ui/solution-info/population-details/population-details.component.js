import template from './population-details.component.html';

class PopulationDetailsComponent {
    constructor() {
        this.worstKnapsack = {};
        this.bestKnapsack = {};
    }

    $onChanges() {
        if (this.population && this.population.length) {
            let populationSortedByFitness = [...this.population].sort((a, b) => a.fitness - b.fitness);

            this.worstKnapsack = populationSortedByFitness.shift();
            this.bestKnapsack = populationSortedByFitness.pop();
        }
    }

    getQuartiles() {
        let quartiles = [];

        for (let quartile = 1; quartile <= 4; quartile++) {
            const endOfQuartile = quartile * this.quartileSize;
            const startOfQuartile = endOfQuartile - this.quartileSize;

            console.log(startOfQuartile, endOfQuartile)

            quartiles.push(this.population.slice(startOfQuartile, endOfQuartile));
        }

        return quartiles;
    }
}

export default {
    template,
    controller: PopulationDetailsComponent,
    controllerAs: 'PopulationDetails',
    bindings: {
        population: '<',
        headerText: '@',
        headerBackground: '@',
        headerColor: '@'
    }
}