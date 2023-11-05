function init(location, counterOfWidgets) {
    let map = new ymaps.Map(`map_${counterOfWidgets}`, {
        center: location,
        zoom: 12
    });

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('rulerControl');
}

export function createMapInWidget(location, counterOfWidgets) {
    init(location, counterOfWidgets)
    ymaps.ready(init);
}
