import angular from 'angular';
import './style.css';
import 'angular-chart.js';

import ElementsModule from './elements/elements.module';

import AppComponent from './app.component';
import HeaderComponent from './header/header.component';
import KnapsackParametersComponent from './knapsack-parameters/knapsack-parameters.component';
import GeneticParametersComponent from './genetic-parameters/genetic-parameters.component';
import PopulationDetailsComponent from './population-details/population-details.component';

import GeneticAlgorithmService from './genetic-algorithm.service';
import IpcService from './ipc.service';

angular.module('app', [ElementsModule, 'chart.js'])
    .component('app', AppComponent)
    .component('appHeader', HeaderComponent)
    .component('appKnapsackParameters', KnapsackParametersComponent)
    .component('appGeneticParameters', GeneticParametersComponent)
    .component('appPopulationDetails', PopulationDetailsComponent)
    .service('GeneticAlgorithmService', GeneticAlgorithmService)
    .service('IpcService', IpcService);
