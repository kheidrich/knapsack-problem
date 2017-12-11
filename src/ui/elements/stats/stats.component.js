import template from './stats.component.html';

class StatsComponent {

}

export default {
    template,
    controller: StatsComponent,
    controllerAs: 'Stats',
    bindings: {
        label: '@',
        icon: '@',
        stats: '<',
        orientation: '@'
    }
}