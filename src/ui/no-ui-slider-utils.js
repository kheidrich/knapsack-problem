function createSlider(elementId, { step, min, max }) {
    let slider = document.getElementById(elementId);
    let options = {
        start: [Math.trunc(max * 30 / 100), Math.trunc(max * 70 / 100)],
        connect: true,
        behavior: 'tap-drag',
        orientation: 'horizontal',
        format: wNumb({
            decimals: 0
        }),
        margin: Math.trunc(max * 20 / 100),
        step,
        range: { min, max },
    };

    noUiSlider.create(slider, options);
}

function getSliderValuesTruncatedOnUpdate(slider, callback) {
function getSliderValuesTruncatedOnUpdate(sliderId, callback) {
    let slider = document.getElementById(sliderId).noUiSlider;

    slider.on('update', () => {
        let values = slider.get().map(value => Math.trunc(value));
        
        callback(...values);
    });
}
