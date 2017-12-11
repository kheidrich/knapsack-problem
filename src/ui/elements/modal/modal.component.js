import template from './modal.component.html';
import jquery from 'jquery';

class ModalComponent {
    constructor($element){
        this.$element = $element;
    }

    $onInit(){
        jquery('.modal', this.$element).modal();
    }
}

export default {
    template,
    controller: ModalComponent,
    controllerAs: 'Modal',
    bindings: {
        name: '@'
    },
    transclude: true
}