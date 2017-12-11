import angular from 'angular';
import './style.css';

import MaterializeElementsModule from './materialize-elements/materialize-elements.module';
import SolutionInfoModule from './solution-info/solution-info.module';

import AppComponent from './app.component';
import HeaderComponent from './header/header.component';
import KnapsackParametersComponent from './knapsack-parameters/knapsack-parameters.component';
import GeneticParametersComponent from './genetic-parameters/genetic-parameters.component';

angular.module('app', [MaterializeElementsModule, SolutionInfoModule])
    .component('app', AppComponent)
    .component('header', HeaderComponent)
    .component('knapsackParameters', KnapsackParametersComponent)
    .component('geneticParameters', GeneticParametersComponent);
