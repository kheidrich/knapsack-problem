import template from './stop-criteria-parameters.component.html';

class StopCriteriaParametersComponent {

    updateModel() {
        this.ngModel.$setViewValue({
            maxIterations: this.maxIterations,
            optimalEstabilization: this.optimalEstabilization
        })
    }
}

export default {
    template,
    controller: StopCriteriaParametersComponent,
    controllerAs: 'StopCriteriaParameters',
    require: {
        ngModel: 'ngModel'
    }
}