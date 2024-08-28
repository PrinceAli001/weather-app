display();


function display() {
    const main = document.querySelector('main');
    const input = document.querySelector('input');
    const btn = document.querySelector('#btn');
    const place = document.querySelector('#place');
    const degree = document.querySelector('#degree');
    const description = document.querySelector('#description');
    const tmrDeg = document.querySelector('#tomorrow-deg');
    const nxtTmrDeg = document.querySelector('#nxt-tomorrow-deg');
    const overTmrDeg = document.querySelector('#overmorrow-deg');
    const dialog = document.querySelector('dialog');

    async function getWeatherDetails(location) {
        try {
            let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=KFQSEQT4JA3AUQFE6SX96TPVH&contentType=json`, {mode: 'cors'})
            let result = await response.json();
            changeWeatherDetails(result);
            stopLoad();
        } catch (err) {
            stopLoad();
            alert('Information cannot be retrieved at the moment, please try again later');
            console.log(err)
        }
    };
    function changeWeatherDetails(details) {
        place.textContent = `${details.address}`;
        degree.textContent = `${changeIcon(details)} ${details.currentConditions.temp} °C`
        description.textContent = `'${details.currentConditions.conditions}'`;
        tmrDeg.textContent = ` ${details.days[1].temp} °C`;
        nxtTmrDeg.textContent = ` ${details.days[2].temp} °C`;
        overTmrDeg.textContent = ` ${details.days[3].temp} °C`;
    };
    function changeIcon(result) {
        if (result.currentConditions.icon == 'clear-day') {
            return '🌤️';
        } else if(result.currentConditions.icon == 'cloudy') {
            return '☁️';
        } else if(result.currentConditions.icon == 'rainy') {
            return '🌧️';
        } else if(result.currentConditions.icon == 'sunny') {
            return '☀️';
        } else if(result.currentConditions.icon == 'partly-cloudy-day') {
            return '🌥️';
        } else {
            return '🌤️';
        }
    };
    function startLoad() {
        dialog.showModal();
    };
    function stopLoad() {
        dialog.close();
    };

    btn.addEventListener('click',() => {
        startLoad();
        getWeatherDetails(input.value);
    })
} 