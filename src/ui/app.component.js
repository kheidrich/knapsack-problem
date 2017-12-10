import template from './app.component.html';

class AppComponent {
    constructor(){

    }

    updateParameters(){
        console.log(this.knapsackParameters)
    }
}

export default {
    template,
    controller: AppComponent,
    controllerAs: 'App'
}