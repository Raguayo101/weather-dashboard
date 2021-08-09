
// trying to get our forcast 
function getWeather(userInput){
    if(!userInput){
        return;
    }
    var apiEndPoint = `http://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=cd979f38b9769fc27e8605c58c631c3d&units=imperial`;
    fetch(apiEndPoint)
        .then((res) => res.json())
        .then((data) => {
            // select our forsecast and add a header to it
            var weatherEl = document.querySelector('#weather');
            weatherEl.innerHTML = '<h4 class ="mt-3">5-day Forecast:</h4>';

            weatherRowEl = document.createElement('div');
            weatherRowEl.className = '"row"';

            // going to start looping through the forecasts
            for (var i = 0; i <data.list.length; i++){
                if(data.list[i].dt_txt.indexOf('15:00:00')!== -1){
                    //creating our html elements
                    
                }
            }
        });
}


