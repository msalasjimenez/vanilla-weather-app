function formatDate(timestamp) {
  //calcula el tiempo
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForescast(response) {
  let forescast = response.data.daily;

  let forescastElement = document.querySelector("#forescast");

  let forescastHTML = `<div class="row">`;
  forescast.forEach(function (forescastday, index) {
    if (index < 6) {
      forescastHTML =
        forescastHTML +
        `<div class="col-2">
                  <div class="weather-forescast-date">${formatDay(
                    forescastday.time
                  )}</div>
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                      forescastday.condition.icon
                    }.png"
                    alt=""
                    width="42"
                  />
                  <div class="weather-forescast-temperature">
                    <span class="weather-forescast-temperature-max"> ${Math.round(
                      forescastday.temperature.maximum
                    )}° </span>
                    <span class="weather-forescast-temperature-min"> ${Math.round(
                      forescastday.temperature.minimum
                    )}° </span>
                  </div>
                </div>`;
    }
  });
  forescastHTML = forescastHTML + `</div>`;
  forescastElement.innerHTML = forescastHTML;
}

function getForescast(coordinates) {
  console.log(coordinates);
  let apiKey = "4031af3089baee44t6720aff433o521e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForescast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiustemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiustemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForescast(response.data.coordinates);
}

function search(city) {
  let apiKey = "4031af3089baee44t6720aff433o521e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handlesubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

search("New York");
