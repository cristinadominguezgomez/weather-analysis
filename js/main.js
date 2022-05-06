"use strict";
const button = document.querySelector("button");
const getWeather = async (position) => {
  const { latitude, longitude } = position.coords;
  const key = "";
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily&appid=${key}`
    );
    if (res.ok) {
      const { hourly } = await res.json();
      const datosHora = [];

      for (let i = 0; i < 8; i++) {
        datosHora.push(hourly[i].weather);
        const previsionHora = datosHora.map((hora) => {
          return { main: hora[0].main };
        });
        switch (previsionHora[i].main) {
          case "Rain":
            console.log("Rain");
            break;
          case "Clouds":
            console.log("Clouds");
            break;
          case "Clear":
            console.log("Clear");
            break;
          default:
            console.log("por defecto");
        }
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
