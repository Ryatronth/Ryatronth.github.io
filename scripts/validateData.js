export function checkData(){
    const hideElemId = document.querySelector('.hidden').id;
    if (hideElemId === 'city_section'){
        checkCoordinates();
    } else if (hideElemId === 'coordinate_section') {
        checkCity();
    }
}

export function checkApiData(data){
    if (data.error){
        const errBlock = document.querySelector('.input-location__error-block');
        errBlock.textContent = 'Данное место не найдено.';
        errBlock.style.display = 'block';
        throw new Error('Данное место не найдено.');
    }
}

function checkCoordinates() {
    const latitude = document.querySelector('#latitude').value;
    const longitude = document.querySelector('#longitude').value;
    const errBlock = document.querySelector('.input-location__error-block');
    if (!latitude || !longitude){
        errBlock.textContent = 'Заполните все поля.';
        errBlock.style.display = 'block';
        throw new Error('Заполните все поля.');
    }
    else if (!Number.isFinite(Number(latitude)) || !Number.isFinite(Number(longitude))){
        errBlock.textContent = 'Поля должны быть заполнены числами.';
        errBlock.style.display = 'block';
        throw new Error('Поля должны быть заполнены числами.');
    }
    else {
        errBlock.style.display = 'none';
        return true;
    }
}

function checkCity(){
    const city = document.querySelector('#city').value;
    const errBlock = document.querySelector('.input-location__error-block');
    if (!city){
        errBlock.textContent = 'Заполните поле.';
        errBlock.style.display = 'block';
        throw new Error('Заполните поле.');
    } else if (city.match(/\d+/g) !== null) {
        errBlock.textContent = 'Поле не должно содержать числа.';
        errBlock.style.display = 'block';
        throw new Error('Заполните поле.');
    } else {
        errBlock.style.display = 'none';
        return true;
    }
}