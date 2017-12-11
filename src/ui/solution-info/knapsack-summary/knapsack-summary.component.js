import template from './knapsack-summary.component.html';

class KnapsackSummaryComponent {

}

export default {
    template,
    controller: KnapsackSummaryComponent,
    controllerAs: 'KnapsackSummary',
    bindings: {
        weight: '@',
        value: '@',
        objects: '@'
    }
}