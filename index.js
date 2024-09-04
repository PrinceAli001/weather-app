display();


function display() {
    const main = document.querySelector('main');
    const input = document.querySelector('input');
    const btn = document.querySelector('#btn');
    const place = document.querySelector('#place');
    const degContainer = document.querySelector('#deg-container');
    const icon = document.querySelector('#icon');
    const degree = document.querySelector('#degree');
    const temp = document.querySelector('#temp');
    const description = document.querySelector('#description');
    const tmrDeg = document.querySelector('#tomorrow-deg');
    const nxtTmrDeg = document.querySelector('#nxt-tomorrow-deg');
    const overTmrDeg = document.querySelector('#overmorrow-deg');
    const dialog = document.querySelector('dialog');
    let currentIcon;
    let oldDeg;
    let string;
    let newDeg;

    function changeBackgroundImg(result) {
        main.setAttribute('style',`background-image: url(${result.data.images.original.url});`);
    }
    function getBackgroundImg(icon) {
        fetch(`https://api.giphy.com/v1/gifs/translate?api_key=YNBm3HS8YMVb4pPxTyO11p2e7lkum8n5&s=${icon}`, {mode: 'cors'})
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                changeBackgroundImg(response);
            });
    }
    function getIcon(data) {
        currentIcon = data.currentConditions.conditions;
    }
    async function getWeatherDetails(location) {
        try {
            let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=KFQSEQT4JA3AUQFE6SX96TPVH&contentType=json`, {mode: 'cors'})
            let result = await response.json();
            changeWeatherDetails(result);
            getIcon(result);
            stopLoad();
        } catch (err) {
            stopLoad();
            alert('Information cannot be retrieved at the moment, please try again later');
            console.log(err);
        };
    };
    function changeWeatherDetails(details) {
        place.textContent = `${details.address}`;
        icon.textContent = `${changeIcon(details)}`;
        degree.textContent = ` ${details.currentConditions.temp}`;
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
        };
    };
    function startLoad() {
        dialog.showModal();
    };
    function stopLoad() {
        dialog.close();
    };
    function convertTemp() {
        if (degContainer.textContent.includes('°C')) {
            oldDeg = (degree.textContent * 9/5) + 32;
            string = oldDeg.toString();
            newDeg = string.slice(0,5);
            degree.textContent = ` ${newDeg}`;
            temp.textContent = ' °F';
        } else {
            startLoad();
            getWeatherDetails(input.value)
                .then((response) => {
                    return response.json
                })
                .then((response) => {
                    stopLoad();
                    degree.textContent = `${response.currentConditions.temp}`;
                })
            temp.textContent = ' °C';
        }
    };

    degContainer.addEventListener('click', convertTemp);
    btn.addEventListener('click',() => {
        startLoad();
        getWeatherDetails(input.value);
        getBackgroundImg(currentIcon);
    });
} 