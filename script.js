window.addEventListener('load', () => {

  // we want to be able to grab our exisiting local storage, if it is avaiable
  var currentHistory;
  if (!JSON.parse(localStorage.getItem('history'))) {
    currentHistory = [];
  } else {
    currentHistory = JSON.parse(localStorage.getItem('history'));
  }

  var itemHistory = [];

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
            var columnEl = document.createElement('div');
            columnEl.classList.add('col-md-2');

            var cardEl = document.createElement('div');
            cardEl.classList.add('card', 'bg-primary', 'text-white');

            var windsEl = document.createElement('p');
            windsEl.classList.add('card-text');
            windsEl.textContent = `Wind Speed: ${data.list[i].wind.speed} MPH`;

            var humidityEl = document.createElement('p');
            humidityEl.classList.add('card-text');
            humidityEl.textContent = `humidity: ${data.list[i].main.humidity} MPH`;

            var bodyEl = document.createElement('div');
            bodyEl.classList.add('card-body', 'p-2');

            var titleEl = document.createElement('h5');
            titleEl.classList.add('card-title');
            titleEl.textContent = new Date(
              data.list[i].dt_txt
            ).toLocaleDateString();
            var imgEl = document.createElement('img');
            imgEl.setAttribute(
              'src',
              `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
            )

            var pOneEl = document.createElement('p');
            var tempTextEl = document.createElement('p');
            pOneEl.classList.add('card-text');
            pOneEl.textContent = `Temp: ${data.list[i].main.temp_max} °F`;

            var pTwoEl = document.createElement('p');
            var humidityTextEl = document.createElement('p');
            pTwoEl.classList.add('card-text');
            pTwoEl.textContent = `Humidity: ${data.list[i].main.humidity}%`;

            // merge it all together
            columnEl.appendChild(cardEl);
            bodyEl.appendChild(titleEl);
            bodyEl.appendChild(windsEl);
            bodyEl.appendChild(humidityEl);
            bodyEl.appendChild(tempTextEl);
            bodyEl.appendChild(imgEl);
            bodyEl.appendChild(humidityTextEl);
            cardEl.appendChild(bodyEl);
            weatherEl.appendChild(columnEl);
          }
        }
      });
  }

  // with this will show our UV index

  const grabUVIndex = (lat, lon) => {

    fetch(
      `http://api.openweathermap.org/data/2.5/uvi?appid=d91f911bcf2c0f925fb6535547a5ddc9&lat=${lat}&lon=${lon}`
    )
      .then((response) => response.json())
      .then((data) => {
        var bodyEl = document.querySelector('.card-body');
        var uvEl = document.createElement('p');
        uvEl.id = 'uv'
        uvEl.textContent = 'UV Index';
        var buttonEl = document.createElement('span');
        buttonEl.classList.add('btn', 'btn-sm');
        buttonEl.innerHTML = data.value;

        switch (data.value) {
          case data.value < 3:
            buttonEl.classList.add('btn-success');
            break;
          case data.value < 7:
            buttonEl.classList.add('btn-warning');
          default:
            buttonEl.classList.add('btn-danger');
        }

        bodyEl.appendChild(uvEl);
        uvEl.appendChild(buttonEl);

      });
  }

  const ourHistory = (his) => {
    if (currentHistory && currentHistory.length > 0) {
      var currentEntries = JSON.parse(localStorage.getItem('history'));
      var newHistory = [...currentEntries, his];
      localStorage.setItem('history', JSON.stringify(newHistory));
    } else {
      historyItems.push(his);
      localStorage.setItem('history', JSON.stringify(historyItems));
    }
  }

  const searchWeather = (searchInput) => {

    var endpointUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`;
    fetch(endpointUrl)
      .then((response) => response.json())
      .then((data) => {
        // now we begin to call our history methods
        if (!currentHistory.includes(searchInput)) {
          ourHistory(searchInput);
        }
        // we want to use this to clear any old content
        todayEl = document.querySelector('#current');
        todayEl.textContent = ' ';

        // now we want to create html tags to appear  for current weather
        var titleEl = document.createElement('h3');
        titleEl.classList.add('card-title');
        titleEl.textContent = `
        ${data.name}(${new Date().toLocaleDateString()})`;
        var cardEl = document.createElement('div');
        cardEl.classList.add('card');
        var windsEl = document.createElement('p');
        windsEl.classList.add('card-text');
        var tempEl = document.createElement('p')
        tempEl.classList.add('card-text');
        var humidityEl = document.createElement('p');
        humidityEl.classList.add('card-text');

        humidityEl.textContent = `Humidity: ${data.main.humidity} %`;
        tempEl.textContent = `Temp is : ${data.main.temp} F`;

        var cardBodyEl = document.createElement('div');
        cardBodyEl.classList.add('card-body');
        var imgEl = document.createElement('img');
        imgEl.setAttribute(
          'src',
          `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        )

        // now we want to append it all to our page so it will show! 
        titleEl.appendChild(imgEl);
        cardBodyEl.appendChild(titleEl);
        cardBodyEl.appendChild(tempEl);
        cardBodyEl.appendChild(humidityEl);
        cardBodyEl.appendChild(windsEl);
        cardEl.appendChild(cardBodyEl);
        todayEl.appendChild(cardEl);

        // now we want to call our functions
        getWeather(searchInput);
        grabUVIndex(data.coord.lat, data.coord.lon);

      });

  }

  const genRows = (searchInput) => {
    var listEl = document.createElement('li');
    listEl.classList.add('list-group-item', 'list-group-item-action');
    listEl.id = searchInput;
    var text = searchInput;
    listEl.textContent = text;

    listEl.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        searchWeather(event.target.textContent);
      }
    });
    document.getElementById('previous-search').appendChild(listEl);
  }

  if (currentHistory && currentHistory.length > 0) {
    currentHistory.forEach((item) => genRows(item));
  }

  const searchVal = () => {
    var searchInput = document.querySelector('#city').value;
    if (searchInput) {
      searchWeather(searchInput);
      genRows(searchInput);
      document.querySelector('#city').value = '';
    }
  }

  document.querySelector('#city-button').addEventListener('click', searchVal);



});