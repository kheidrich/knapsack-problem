import template from './genetic-parameters.component.html'

class GeneticParametersComponent {

    updateModel() {
        const { populationSize, generationInterval, mutationRate, geneMutationRate, numberOfIterations } = this;

        this.ngModel.$setViewValue({
            populationSize,
            generationInterval,
            mutationRate,
            geneMutationRate,
            numberOfIterations
        });
    }
}

export default {
    template,
    controller: GeneticParametersComponent,
    controllerAs: 'GeneticParameters',
    require: {
        ngModel: 'ngModel'
    }
}

