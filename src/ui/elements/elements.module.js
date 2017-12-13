import angular from 'angular';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';
import './material-icons.css';

import SliderComponent from './slider/slider.component';
import RangeSliderComponent from './range-slider/range-slider.component';
import RadioGroupComponent from './radio-group/radio-group.component';
import ModalComponent from './modal/modal.component';
import StatsComponent from './stats/stats.component';
import HoverEffectDirective from './hover-effect/hover-effect.directive';

import ModalService from './modal/modal.service';

import RangeSliderDefaultOpitions from './range-slider/range-slider-default-options.constant';

export default angular.module('ElementsModule', [])
    .component('appSlider', SliderComponent)
    .component('appRangeSlider', RangeSliderComponent)
    .component('appRadioGroup', RadioGroupComponent)
    .component('appModal', ModalComponent)
    .component('appStats', StatsComponent)
    .directive('appHoverEffect', HoverEffectDirective)
    .service('ModalService', ModalService)
    .constant('RangeSliderDefaultOptions', RangeSliderDefaultOpitions)
    .name;