function formatDate(timestamp) {
  let date = new Date(timestamp);
   let hours = date.getHours();
   if (hours < 10) {
     hours = `0${hours}`;
  }
   let minutes = date.getMinutes();
   if (minutes < 10) {
     minutes = `0${minutes}`;
   }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHtml = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHtml = forecastHtml + `
    <div class="col-2">
      <p>${day}</p>
      <img src="" alt="" />
      <p>-3°C</p>
    </div>
  `;
  })
    
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function search(city) {
  let units = "metric";
  let apiKey = "36e7fo0b86cb5b2eaef4ta82a0364d1f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#city");
form.addEventListener("click", handleSubmit);

function getForecast(coordinates) {
  let apiKey = "36e7fo0b86cb5b2eaef4ta82a0364d1f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}°C`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.city;
  let description = document.querySelector("#description")
  description.innerHTML = response.data.condition.description;
  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = formatDate(response.data.time * 1000);
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `wind: ${response.data.wind.speed} km/h`;
  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}
