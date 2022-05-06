"use strict";

const button = document.querySelector("button");
const app = document.querySelector("section.app");

const getWeatherIconUrl = (weather) => {
  let iconUrl = "";

  switch (weather) {
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

const writeWeather = (infoWeather8H) => {
  const weatherList = infoWeather8H.map((weather) => {
    const iconUrl = getWeatherIconUrl(weather);
    return `
    <li>
     <img src=${iconUrl}></img>
     <span>${weather}</span>
    </li>`;
  });

  app.innerHTML = `<ul>${weatherList.join("")}</ul>`;
};

const getWeather = async (position) => {
  const { latitude, longitude } = position.coords;

  const key = "";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily,current,alerts&appid=${key}`
    );
    if (res.ok) {
      const { hourly } = await res.json();

      const infoWeather = hourly.map((hour) => {
        return hour.weather[0].main;
      });
      const infoWeather8H = infoWeather.slice(0, 8);
      writeWeather(infoWeather8H);

      const willRain = infoWeather8H.some((elem) => elem === "Rain");

      if (willRain) {
        app.innerHTML += `<p>Llovera en las proximas 8 hrs</p>`;
      } else {
        app.innerHTML += `<p>No lloverá en las proximas 8 hrs</p>`;
      }
    } else {
      console.log("Hubo un error en la petición");
    }
  } catch (error) {
    console.error(error.message);
  }
};

button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(getWeather);
});
