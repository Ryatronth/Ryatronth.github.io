const button_coordinate = document.querySelector('.input-location__showCoordinates');
const button_city = document.querySelector('.input-location__showCity');
const coordinate_section = document.querySelector('#coordinate_section');
const city_section = document.querySelector('#city_section');
const errBlock = document.querySelector('.input-location__error-block');

button_coordinate.addEventListener('click', () => {
    city_section.classList.add('hidden');
    coordinate_section.classList.remove('hidden');
    errBlock.style.display = 'none';
});
button_city.addEventListener('click', () => {
    city_section.classList.remove('hidden');
    coordinate_section.classList.add('hidden');
    errBlock.style.display = 'none';
});
