import {createWeatherWidget} from "./widget.js";
import {checkData, checkApiData} from "./validateData.js";

const apiKey = 'df243bfd6e5f4f10831134535230311';

const form = document.querySelector('.input-location__form');

form.onsubmit = (e) => {
    e.preventDefault();
    checkData();
    const place = getPlaceValue();
    const placeInfo = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${place}&lang=ru`;
    return appendWidget(placeInfo);
}

function appendWidget(placeInfo) {
    return fetch(placeInfo).then((response) => {
        return response.json();
    }).then((data) => {
        checkApiData(data);
        console.log(data)
        return createWeatherWidget(data);
    })
}

function getPlaceValue() {
    const hiddenElemId = document.querySelector('.hidden').id;
    if (hiddenElemId === 'coordinate_section') {
        return document.querySelector('#city').value;
    } else if (hiddenElemId === 'city_section') {
        return [document.querySelector('#latitude').value, document.querySelector('#longitude').value];
    }
}
