import template from './app.component.html';
import KnapsackGaSolution from '../core/knapsack-ga-solution';
import GeneticAlgorithm from '../core/genetic-algorithm';

class AppComponent {
    constructor(
        ModalService,
        GeneticAlgorithmService,
        $scope
    ) {
        this.ModalService = ModalService;
        this.GeneticAlgorithmService = GeneticAlgorithmService;
        this.solutionStatus = 'configuring';
        this.initialPopulation = [];
        this.finalPopulation = [];
        this.fitnessVariationChart = { labels: [], data: [] };
        this.objectsChart = [];
        this.objectsChartOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: (value, index, values) => `R$ ${value}`
                    }
                }],
                xAxes: [{
                    ticks: {
                        callback: (value, index, values) => `${-value} kg`
                    }
                }]
            }
        }
        this.$scope = $scope
    }

    async solve() {
        const { populationSize, generationInterval, mutationRate } = this.geneticParameters;
        const { geneMutationRate } = this.geneticParameters;
        const { maxIterations, optimalStabilization } = this.geneticParameters;

        this.solutionStatus = 'solving';
        this.ModalService.openModal('solving-loader');
        await this.GeneticAlgorithmService.initialize(
            this.knapsackParameters,
            { populationSize, generationInterval, mutationRate },
            { geneMutationRate }
        )
        this.initialPopulation = await this.GeneticAlgorithmService.getActualPopulation();
        await this.GeneticAlgorithmService.solve(maxIterations, 0);
        this.finalPopulation = await this.GeneticAlgorithmService.getActualPopulation();
        await this.generateFitnessVariationChart();
        await this.generateObjectsChart();
        this.ModalService.closeModal('solving-loader');
        this.solutionStatus = 'solved';
        this.$scope.$digest();
    }

    reset() {
        this.initialPopulation = [];
        this.finalPopulation = [];
        this.fitnessVariationChart = { labels: [], data: [] };
        this.objectsChart = [];
        this.solutionStatus = 'configuring';
    }

    async generateFitnessVariationChart() {
        let initialPopulationData, finalPopulationData;

        [initialPopulationData, finalPopulationData] = await Promise.all([
            Promise.all(
                this.initialPopulation
                    .filter((knapsack, index) => (index + 1) % 10 === 0)
                    .map(async knapsack => (await this.GeneticAlgorithmService.getKnapsackSummary(knapsack)).fitness)
            ),
            Promise.all(
                this.finalPopulation
                    .filter((knapsack, index) => (index + 1) % 10 === 0)
                    .map(async knapsack => (await this.GeneticAlgorithmService.getKnapsackSummary(knapsack)).fitness)
            )
        ]);

        this.fitnessVariationChart.labels = initialPopulationData.map((data, index) => index);
        this.fitnessVariationChart.data.push(initialPopulationData, finalPopulationData);
    }

    async generateObjectsChart() {
        let objects;
        const minBubbleRadius = 5, maxBubbleRadius = 10;

        objects = await this.GeneticAlgorithmService.getObjects();
        this.objectsChart = objects.map((object, index) => ({
            x: -object.weight,
            y: object.value,
            r: 10
        }));
    }
}

export default {
    template,
    controller: AppComponent,
    controllerAs: 'App'
}