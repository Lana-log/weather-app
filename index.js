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

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
    let city = cityInput.value;
let units = "metric";
let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#city");
form.addEventListener("click", search);

function showTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let description = document.querySelector("#description")
  description.innerHTML = response.data.weather[0].description;
  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}
