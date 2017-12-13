import template from './slider.component.html';

class SliderComponent {
    constructor() {
        this.value;
    }

    updateModel() {
        this.ngModel.$setViewValue(this.value);
    }

    renderValue() {
        return `${this.valuePrefix ? this.valuePrefix : ''}${this.value}${this.valueSuffix ? this.valueSuffix : ''}`;
    }
}

export default {
    template,
    controller: SliderComponent,
    controllerAs: 'Slider',
    require: {
        ngModel: 'ngModel'
    },
    bindings: {
        label: '@',
        valuePrefix: '@',
        valueSuffix: '@',
        min: '@',
        max: '@',
        step: '@'
    }
}