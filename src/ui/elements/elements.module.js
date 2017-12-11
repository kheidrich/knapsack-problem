import angular from 'angular';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';
import './material-icons.css';

import BoxWithHeaderComponent from './box-with-header/box-with-header.component';
import SliderComponent from './slider/slider.component';
import RangeSliderComponent from './range-slider/range-slider.component';
import RadioGroupComponent from './radio-group/radio-group.component';
import ModalComponent from './modal/modal.component';
import CollapsibleBoxComponent from './collapsible-box/collapsible-box.component';
import CollapsibleBoxItemComponent from './collapsible-box-item/collapsible-box-item.component';
import StatsComponent from './stats/stats.component'

import ModalService from './modal/modal.service';

import RangeSliderDefaultOpitions from './range-slider/range-slider-default-options.constant';

export default angular.module('ElementsModule', [])
    .component('appBoxWithHeader', BoxWithHeaderComponent)
    .component('appSlider', SliderComponent)
    .component('appRangeSlider', RangeSliderComponent)
    .component('appRadioGroup', RadioGroupComponent)
    .component('appModal', ModalComponent)
    .component('appCollapsibleBox', CollapsibleBoxComponent)
    .component('appCollapsibleBoxItem', CollapsibleBoxItemComponent)
    .component('appStats', StatsComponent)
    .service('ModalService', ModalService)
    .constant('RangeSliderDefaultOptions', RangeSliderDefaultOpitions)
    .name;