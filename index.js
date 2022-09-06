let weather = {
  apikey: '6b3cb227904a168063bc2023652b618c',
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apikey
    )
      .then(response => {
        if (!response.ok) {
          alert('No weather found.');
          throw new Error(
            (document.querySelector('.city').innerHTML =
              'Not a valid city name')
          );
        }
        return response.json();
      })
      .then(data => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector('.city').innerHTML = 'weather in ' + name;
    document.querySelector('.temp').innerHTML = Math.round(temp) + '°C';
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerHTML = description;
    document.querySelector('.humidity').innerHTML =
      'Humidity:' + humidity + '%';

    document.querySelector('.wind').innerHTML = 'Wind speed:' + speed + 'km/h';
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector('.input-bar').value);
  },
};

document.querySelector('.input-bar').addEventListener('click', function () {
  weather.search();
});
document
  .querySelector('.input-bar')
  .addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });

weather.fetchWeather('Bengaluru');
