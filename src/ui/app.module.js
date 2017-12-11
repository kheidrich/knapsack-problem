import angular from 'angular';
import './style.css';

import ElementsModule from './elements/elements.module';
import SolutionInfoModule from './solution-info/solution-info.module';

import AppComponent from './app.component';
import HeaderComponent from './header/header.component';
import KnapsackParametersComponent from './knapsack-parameters/knapsack-parameters.component';
import GeneticParametersComponent from './genetic-parameters/genetic-parameters.component';

angular.module('app', [ElementsModule, SolutionInfoModule])
    .component('app', AppComponent)
    .component('header', HeaderComponent)
    .component('knapsackParameters', KnapsackParametersComponent)
    .component('geneticParameters', GeneticParametersComponent);
