display();


function display() {
    const main = document.querySelector('main');
    const input = document.querySelector('input');
    const btn = document.querySelector('#btn');

    function changeBackgroundImg(result) {
        main.style = `background-image: url(${result});`;
    }
    function getBackgroundImg() {
        fetch('https://api.giphy.com/v1/gifs/translate?api_key=YNBm3HS8YMVb4pPxTyO11p2e7lkum8n5&s=miles morales', {mode: 'cors'})
            .then(function (response) {
                return response.json();
            })
            .then(changeBackgroundImg(response.data.images.original.url))
    };
    async function getLocation() {
        let response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?unitGroup=uk&key=KFQSEQT4JA3AUQFE6SX96TPVH&contentType=json', {mode: 'cors'})
        let result = await response.json();
    };
}