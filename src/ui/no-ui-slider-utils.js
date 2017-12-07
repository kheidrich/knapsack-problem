function createSlider(element, { step, min, max }) {
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

    noUiSlider.create(element, options);
    return element.noUiSlider;
}

function getSliderValuesTruncatedOnUpdate(slider, callback) {
    slider.on('update', () => {
        let [start, end] = slider.get().map(value => Math.trunc(value));
        
        callback(start, end);
    });
}
