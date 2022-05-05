"use strict";
const getWeather = async (position) => {
  const { latitude, longitude } = position.coords;

  const key = "";
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily&appid=${key}`
    );

    const { hourly } = await res.json();
    for (let i = 0; i < 8; i++) {
      console.log(hourly[i]);
    }
  } catch (error) {
    console.error(error.message);
  }
};

navigator.geolocation.getCurrentPosition(getWeather);
