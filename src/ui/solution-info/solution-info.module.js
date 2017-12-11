import angular from 'angular';

import KnapsackSummaryComponent from './knapsack-summary/knapsack-summary.component';

export default angular.module('SolutionInfoModule', [])
    .component('appKnapsackSummary', KnapsackSummaryComponent)
    .name;