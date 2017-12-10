import angular from 'angular';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';
import './material-icons.css';

import BoxWithHeaderComponent from './box-with-header/box-with-header.component';
import SliderComponent from './slider/slider.component';
import RangeSliderComponent from './range-slider/range-slider.component';
import RadioGroupComponent from './radio-group/radio-group.component';

import RangeSliderDefaultOpitions from './range-slider/range-slider-default-options.constant';

export default angular.module('MaterializeElements', [])
    .component('appBoxWithHeader', BoxWithHeaderComponent)
    .component('appSlider', SliderComponent)
    .component('appRangeSlider', RangeSliderComponent)
    .component('appRadioGroup', RadioGroupComponent)
    .constant('RangeSliderDefaultOptions', RangeSliderDefaultOpitions)
    .name;