let currentTime = new Date();
function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let formattedDate = `${currentHours}:${currentMinutes} ${currentDay} ${currentMonth} ${currentDate} ${currentYear}`;
  return formattedDate;
}
let date = document.querySelector("#currentDate");
date.innerHTML = formatDate(currentTime);


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
}
