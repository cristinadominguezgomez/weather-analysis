"use strict";

const button = document.querySelector("button");
const app = document.querySelector("section.app");
const result = document.querySelector("section.result");
const body = document.querySelector("body");

const timeDictionary = {
  Thunderstorm: "Tormenta",
  Drizzle: "Llovizna",
  Rain: "Lluvia",
  Snow: "Nieve",
  Clear: "Despejado",
  Atmosphere: "Ventoso",
  Clouds: "Nubes",
};

const getWeatherIconUrl = (weather) => {
  let iconUrl = "";

  switch (weather[0].main) {
    case "Thunderstorm":
      iconUrl = "icons/thunder.svg";
      break;
    case "Drizzle":
      iconUrl = "icons/rainy-2.svg";
      break;
    case "Rain":
      iconUrl = "icons/rainy-7.svg";
      break;
    case "Snow":
      iconUrl = "icons/snowy-6.svg";
      break;
    case "Clear":
      iconUrl = "icons/day.svg";
      break;
    case "Atmosphere":
      iconUrl = "icons/weather.svg";
      break;
    case "Clouds":
      iconUrl = "icons/cloudy-day-1.svg";
      break;
    default:
      iconUrl = "icons/cloudy-day-1.svg";
  }

  return iconUrl;
};

const writeWeather = (results) => {
  const weatherList = results.map((hour) => {
    const { humidity, temp, weather, dt } = hour;

    const d = new Date(dt * 1000);

    const iconUrl = getWeatherIconUrl(weather);

    return `
    <li>
    <h3>${timeDictionary[weather[0].main]}</h3>
    <h4>${weather[0].description}</h4>
    <p>Hora: ${d.getHours()}:00</p>
    <img src=${iconUrl}></img>
    <p>Temp: ${(temp - 273.15).toFixed(0)}°C</p>
    <p>Humedad: ${humidity}%</p>
    </li>`;
  });

  app.innerHTML = `<ul>${weatherList.join("")}</ul>`;
};

const getWeather = async (position) => {
  const { latitude, longitude } = position.coords;
  const key = "d9f14e26f715ebe1628279e5d2a1f5c6";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily,current,alerts&appid=${key}&lang=es`
    );
    if (res.ok) {
      const { hourly } = await res.json();

      const results = hourly.slice(0, 8);

      const willRain = results.some((elem) => {
        return elem.weather[0].main === "Rain";
      });

      if (willRain) {
        result.innerHTML = `<p>Lloverá en las próximas 8 hrs</p>`;
        body.style.backgroundImage = "url('../images/rain.jpg')";
        button.style.backgroundColor = "#0b1928";
      } else {
        result.innerHTML = `<p>No lloverá en las próximas 8 hrs</p>`;
        body.style.backgroundImage = "url('../images/clear.jpg')";
        button.style.backgroundColor = "#7f9dd2";
      }

      writeWeather(results);
    } else {
      console.log("Hubo un error en la petición");
    }
  } catch (error) {
    console.error(error.message);
  }
};

const onGeolocationError = () => {
  const header = document.querySelector("header");
  const div = document.createElement("div");
  header.append(div);
  div.textContent = "Acceso a la ubicación rechazado.Revisa tu cortafuegos";
};

const clickHandler = () => {
  navigator.geolocation.getCurrentPosition(getWeather, onGeolocationError);
  button.textContent = "Volver";

  button.removeEventListener("click", clickHandler);
  button.addEventListener("click", () => {
    window.location.reload();
  });
};

button.addEventListener("click", clickHandler);
