import template from './knapsack-summary.component.html';

class CollapsibleBoxItemComponent {

}

export default {
    template,
    controller: CollapsibleBoxItemComponent,
    controllerAs: 'CollapsibleBoxItem',
    transclude: {
        header: 'itemHeader',
        content: 'itemContent'
    }
}