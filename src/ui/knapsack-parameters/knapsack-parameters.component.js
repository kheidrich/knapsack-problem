import template from './knapsack-parameters.component.html';

class KnapsackParametersComponent {
    constructor(){

    }

    updateModel(){
        const maxKnapsackWeight = this.maxKnapsackWeight;
        const numberOfObjects = this.numberOfObjects;
        const [minObjectValue,maxObjectValue] = this.objectsValue;
        const [minObjectWeight, maxObjectWeight] = this.objectsWeight;

        this.ngModel.$setViewValue({
            maxKnapsackWeight,
            numberOfObjects,
            minObjectValue,
            maxObjectValue,
            minObjectWeight,
            maxObjectWeight
        });
    }
}

export default {
    template,
    controller: KnapsackParametersComponent,
    controllerAs: 'KnapsackParameters',
    require: {
        ngModel: 'ngModel'
    }
}