class SolutionInfoService {
    getKnapsackSummary(knapsack, objects) {
        // console.log(knapsack, objects)
        return knapsack.reduce((summary, hasObject, index) => {
            console.log(index);
            if (hasObject){
                summary.value += objects[index].value;
                summary.weight += objects[index].weight;
                summary.fitness = summary.value - summary.weight;
                summary.objects++;
            }
            return summary;
        },
            { weight: 0, value: 0, objects: 0, fitness: 0 }
        )
    }
}

export default SolutionInfoService;