import template from './header.component.html';

class HeaderComponent {
    constructor() {
        
    }
}

export default {
    template,
    controller: HeaderComponent,
    controllerAs: 'Header',
    bindings: {
        title: '@'
    }
}