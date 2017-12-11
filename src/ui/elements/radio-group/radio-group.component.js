import template from './radio-group.component.html';
import jquery from 'jquery';

class RadioGroupComponent {

    constructor($element){
        this.$element = $element;
        this.selected = '';
        this.groupName = '';
    }

    $onInit(){
        this.selected = this.options[0].value;
        this.groupName = this.label.split(' ').reduce((name, word) => `${name}${word.toLowerCase()}`, '');
    }

    updateModel(){
        this.ngModel.$setViewValue(this.selected);
    }
}

export default {
    template,
    controller: RadioGroupComponent,
    controllerAs: 'RadioGroup',
    bindings: {
        label: '@',
        collumns: '@',
        options: '<'
    },
    require: {
        ngModel: 'ngModel'
    }
}