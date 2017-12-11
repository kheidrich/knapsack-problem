import angular from 'angular';

import ElementsModule from '../elements/elements.module';

import KnapsackSummaryComponent from './knapsack-summary/knapsack-summary.component';
import PopulationDetailsComponent from './population-details/population-details.component';

import SolutionInfoService from './solution-info.service';

export default angular.module('SolutionInfoModule', [ElementsModule])
    .component('appKnapsackSummary', KnapsackSummaryComponent)
    .component('appPopulationDetails', PopulationDetailsComponent)
    .service('SolutionInfoService', SolutionInfoService)
    .name;