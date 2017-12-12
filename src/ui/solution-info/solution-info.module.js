import angular from 'angular';

import ElementsModule from '../elements/elements.module';

import PopulationDetailsComponent from './population-details/population-details.component';
import SolutionInfoService from './solution-info.service';

export default angular.module('SolutionInfoModule', [ElementsModule])
    .component('appPopulationDetails', PopulationDetailsComponent)
    .service('SolutionInfoService', SolutionInfoService)
    .name;