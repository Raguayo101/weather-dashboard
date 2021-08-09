

// trying to get our forcast
function getWeather(userInput) {
  if (!userInput) {
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
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf('15:00:00') !== -1) {
          //creating our html elements
          var columnEl = docuement.createElement('div');
          columnEl.classList.add('col-md-2');

          var cardEl = docuement.createElement('div');
          cardEl.classList.add('card', 'bg-primary', 'text-white');

          var windsEl = docuement.createElement('p');
          windEl.classList.add('card-text');
          windsEl.textContent = `Wind Speed: ${data.list[i].wind.speed} MPH`;

          var humidityEl = docuement.createElement('p');
          humidityEl.classList.add('card-text');
          humidityEl.textContent = `humidity: ${data.list[i].main.humidity} MPH`;

          var bodyEl = document.createElement('div');
          bodyEl.classList.add('card-body', 'p-2');

          var titleEl = document.createElement('h5');
          titleEl.classList.add('card-title');
          titleEl.textContent = new Date(
            data.list[i].dt_txt
          ).toLocaleDateString();

          var tempTextEl = document.createElement('p');
          p1El.classList.add('card-text');
          p1El.textContent = `Temp: ${data.list[i].main.temp_max} °F`;

          var humidityTextEl = document.createElement('p');
          p2El.classList.add('card-text');
          p2El.textContent = `Humidity: ${data.list[i].main.humidity}%`;
        }
        // merge it all together
        columnEl.appendChild(cardEl);
        bodyEl.appendChild(titleEl);
        bodyEl.appendChild(windsEl);
        bodyEl.appendChild(humidityEl);
        bodyEl.appendChild(tempTextEl);
        bodyEl.appendChild(humidityTextEl);
        cardEl.appendChild(bodyEl);
        weatherEl.appendChild(columnEl);
      }
    });
}

// attemping to get local storage saved
this.addEventListener('load' function(){
    if(!json.parse(this.localStorage.getItem('current'))){
        currentHistory = [];
    } else {
        currentHistory = JSON.parse(this.localStorage.getItem('current'));
    }
});