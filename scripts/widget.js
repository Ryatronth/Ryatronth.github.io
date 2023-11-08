import {createMapInWidget} from "./map.js"

let counterOfWidgets = 0;

export function createWeatherWidget(data) {
    const pattern = document.querySelector('.weather-widget');
    const weatherSection = pattern.cloneNode(true);
    addWidgetData(weatherSection, data);
    addDeleteButton(weatherSection);
    weatherSection.style.background = getBackgroundColor(data);

    const container = document.querySelector(".weather-section");
    container.appendChild(weatherSection);

    createMapInWidget([data.location.lat, data.location.lon], counterOfWidgets);
    counterOfWidgets++;
}

function addWidgetData(widget, data) {
    widget.querySelector('.weather-widget__city').textContent = data.location.name;
    widget.querySelector('.weather-widget__time').textContent = `Сейчас ${(data.location.localtime).slice(11)}`;
    widget.querySelector('.weather-widget__temperature').textContent = data.current.temp_c;
    widget.querySelector('.weather-widget__weather-img').src = `${data.current.condition.icon}`;
    widget.querySelector('.weather-widget__description').textContent = data.current.condition.text;
    widget.querySelector('.weather-widget__temperature-feels').textContent = `Ощущается как ${data.current.feelslike_c}`;
    widget.querySelector('.weather-widget__wind').innerHTML += `${(data.current.wind_kph * 1000 / 3600).toFixed(2)} м/с,
     ${getWindDir(data.current.wind_dir)}`;
    widget.querySelector('.weather-widget__pressure').innerHTML += `${Math.round(data.current.pressure_mb * 0.750064)} мм рт. ст.`;
    widget.querySelector('.weather-widget__humidity').innerHTML += `${data.current.humidity}%`;
    widget.querySelector(`#map_`).id = `map_${counterOfWidgets}`;
    widget.classList.remove('hidden');
}

function addDeleteButton(widget) {
    const deleteButton = widget.querySelector('.weather-widget__close-btn');
    deleteButton.addEventListener('click', () => {
        widget.remove();
    });
}

function getBackgroundColor(data) {
    const desc = data.current.condition.text.toLowerCase();
    const isDay = data.current.is_day === 0 ? 0.7 : 1;
    if (desc.includes('ясно') || desc.includes('солнечно')) {
        return `linear-gradient(105deg, ${getColor(42, 216, 230, isDay)} 0%,
         ${getColor(230, 197, 42, isDay)} 59%)`;
    } else if (desc.includes('пасмурно') || desc.includes('облачно')) {
        return `linear-gradient(317deg, ${getColor(189, 183, 255, isDay)} 1%,
         ${getColor(133, 133, 153, isDay)} 34%, ${getColor(198, 199, 229, isDay)} 79%)`;
    } else if (desc.includes('дожд') || desc.includes('морось')) {
        return `linear-gradient(167deg, ${getColor(166, 157, 227, isDay)} 17%, 
         ${getColor(106, 106, 135, isDay)} 45%, ${getColor(33, 39, 118, isDay)} 73%, 
         ${getColor(59, 63, 118, isDay)} 94%, ${getColor(16, 18, 37, isDay)})`;
    } else if (desc.includes('дым') || desc.includes('туман')) {
        return `linear-gradient(264deg, ${getColor(170, 166, 173, isDay)} 19%,
         ${getColor(143, 133, 133, isDay)} 68%, ${getColor(173, 173, 173, isDay)} 77%)`;
    } else if (desc.includes('снег') || desc.includes('поземок') || desc.includes('метель')) {
        return `linear-gradient(350deg, ${getColor(226, 225, 233, isDay)} 1%, 
         ${getColor(248, 248, 255, isDay)} 68%, ${getColor(255, 255, 255, isDay)} 77%`;
    }
}

function getColor(r, g, b, isDay) {
    return `rgba(${r * isDay}, ${g * isDay}, ${b * isDay}, 1)`
}

function getWindDir(windDir) {
    const WindDir = {
        'N': 'С',
        'S': 'Ю',
        'W': 'З',
        'E': 'В',
        'NE': 'СВ',
        'NW': 'СЗ',
        'NNE': 'ССВ',
        'ENE': 'ВСВ',
        'NNW': 'ССЗ',
        'WNW': 'ЗСЗ',
        'SE': 'ЮВ',
        'SW': 'ЮЗ',
        'ESE': 'ВЮВ',
        'SSE': 'ЮЮВ',
        'WSW': 'ЗЮЗ',
        'SSW': 'ЮЮЗ',
    }
    return WindDir[windDir]
}