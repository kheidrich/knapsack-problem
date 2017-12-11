import template from './collapsible-box.component.html';

import jquery from 'jquery';

class CollapsibleBoxComponent {
    constructor($element) {
        this.$element = $element;
    }

    $onInit() {
        jquery('.collapsible', this.$element).collapsible();
    }
}

export default {
    template,
    controller: CollapsibleBoxComponent,
    controllerAs: 'CollapsibleBox',
    transclude: true
}