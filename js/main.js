"use strict";

const button = document.querySelector("button");
const app = document.querySelector("section.app");

const writeWeather = (infoWeather8H) => {
  const weatherList = infoWeather8H.map((weather) => {
    return `
    <li><p>${weather}</p></li>`;
  });
  app.innerHTML = `<ul>${weatherList.join("")}</ul>`;
};

const getWeather = async (position) => {
  const { latitude, longitude } = position.coords;

  const key = "d9f14e26f715ebe1628279e5d2a1f5c6";

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
