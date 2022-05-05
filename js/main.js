("use strict");

const button = document.querySelector("button");

const getWeather = async (position) => {
  const { latitude, longitude } = position.coords;

  const key = "e4bcc9331cb23fccb8f2334e39b3b0a4";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily&appid=${key}`
    );
    if (res.ok) {
      const { hourly } = await res.json();
      for (let i = 0; i < 8; i++) {
        console.log(hourly[i]);
      }
    } else {
      console.log("Hubo un error en la petición");
    }
  } catch (error) {
    console.error(error.message);
  }
};

button.addEventListener("click", (event) => {
  navigator.geolocation.getCurrentPosition(getWeather);
});
