import template from './box-with-header.component.html';

class BoxWithHeaderComponent {
    constructor(){
        
    }
}

export default {
    template,
    controller: BoxWithHeaderComponent,
    controllerAs: 'Card',
    transclude: {
        header: 'boxHeader',
        content: 'boxContent',
    }
}