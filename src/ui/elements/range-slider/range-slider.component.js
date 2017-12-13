import template from './range-slider.component.html';
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.js';
import 'materialize-css/extras/noUiSlider/nouislider.css';
import jquery from 'jquery';


class RangeSliderComponent {
    constructor($element, RangeSliderDefaultOptions) {
        this.$element = $element;
        this.RangeSliderDefaultOptions = RangeSliderDefaultOptions;
        this.value;
    }

    $onInit() {
        this.renderSlider();
        this.getSliderElement().noUiSlider.on('update', this.updateModel.bind(this));
    }

    renderInitialValue() {
        return `${this.valuePrefix ? this.valuePrefix : ''}${this.value[0]}${this.valueSuffix ? this.valueSuffix : ''}`;
    }

    renderFinalValue() {
        return `${this.valuePrefix ? this.valuePrefix : ''}${this.value[1]}${this.valueSuffix ? this.valueSuffix : ''}`;
    }

    getSliderElement() {
        return jquery('[name="slider"]', this.$element)[0];
    }

    renderSlider() {
        let slider = this.getSliderElement();
        let options = this.RangeSliderDefaultOptions;

        options.start = [
            Math.trunc((this.max - this.min) * 30 / 100),
            Math.trunc((this.max - this.min) * 70 / 100)
        ];
        options.step = +this.step;
        options.range = { min: +this.min, max: +this.max };
        noUiSlider.create(slider, options);
    }

    getTruncatedSliderValue() {
        let [initial, final] = this.getSliderElement().noUiSlider.get();

        return [Math.trunc(initial), Math.trunc(final)];
    }

    updateModel() {
        let [initial, final] = this.getTruncatedSliderValue();

        this.value = [initial, final];
        this.ngModel.$setViewValue([initial, final]);
    }
}

RangeSliderComponent.$inject = [
    '$element',
    'RangeSliderDefaultOptions'
];

export default {
    template,
    controller: RangeSliderComponent,
    controllerAs: 'RangeSlider',
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