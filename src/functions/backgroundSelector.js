const images = {
  day: {
    Clouds: "./assets/img/Clouds-day",
    Thunderstorm: "./assets/img/Thunderstorm-day",
    Drizzle: "./assets/img/Drizzle-day",
    Rain: "./assets/img/Rain-day",
    Snow: "./assets/img/Snow-day",
    Mist: "./assets/img/Mist-day",
    Smoke: "./assets/img/Smoke-day",
    Haze: "./assets/img/Haze-day",
    Dust: "./assets/img/Dust-day",
    Fog: "./assets/img/Fog-day",
    Sand: "./assets/img/Sand-day",
    Ash: "./assets/img/Ash-day",
    Squall: "./assets/img/Squall-day",
    Tornado: "./assets/img/Tornado-day",
    Clear: "./assets/img/Clear-day",
  },
  night: {
    Clouds: "./assets/img/Clouds-night",
    Thunderstorm: "./assets/img/Thunderstorm-night",
    Drizzle: "./assets/img/Drizzle-night",
    Rain: "./assets/img/Rain-night",
    Snow: "./assets/img/Snow-night",
    Mist: "./assets/img/Mist-night",
    Smoke: "./assets/img/Smoke-night",
    Haze: "./assets/img/Haze-night",
    Dust: "./assets/img/Dust-night",
    Fog: "./assets/img/Fog-night",
    Sand: "./assets/img/Sand-night",
    Ash: "./assets/img/Ash-night",
    Squall: "./assets/img/Squall-night",
    Tornado: "./assets/img/Tornado-night",
    Clear: "./assets/img/Clear-night",
  },
};

export const backgroundSelector = (weather, daySegment) => {
  switch (daySegment) {
    case "day": {
      switch (weather) {
        case "Clouds": {
          return images.day.Clouds;
        }
        case "Thunderstorm": {
          return images.day.Thunderstorm;
        }
        case "Drizzle": {
          return images.day.Drizzle;
        }
        case "Rain": {
          return images.day.Rain;
        }
        case "Snow": {
          return images.day.Snow;
        }
        case "Mist": {
          return images.day.Mist;
        }
        case "Smoke": {
          return images.day.Smoke;
        }
        case "Haze": {
          return images.day.Haze;
        }
        case "Dust": {
          return images.day.Dust;
        }
        case "Fog": {
          return images.day.Fog;
        }
        case "Sand": {
          return images.day.Sand;
        }
        case "Ash": {
          return images.day.Ash;
        }
        case "Squall": {
          return images.day.Squall;
        }
        case "Tornado": {
          return images.day.Tornado;
        }
        case "Clear": {
          return images.day.Clear;
        }
      }
    }
    case "night": {
      switch (weather) {
        case "Clouds": {
          return images.night.Clouds;
        }
        case "Thunderstorm": {
          return images.night.Thunderstorm;
        }
        case "Drizzle": {
          return images.night.Drizzle;
        }
        case "Rain": {
          return images.night.Rain;
        }
        case "Snow": {
          return images.night.Snow;
        }
        case "Mist": {
          return images.night.Mist;
        }
        case "Smoke": {
          return images.night.Smoke;
        }
        case "Haze": {
          return images.night.Haze;
        }
        case "Dust": {
          return images.night.Dust;
        }
        case "Fog": {
          return images.night.Fog;
        }
        case "Sand": {
          return images.night.Sand;
        }
        case "Ash": {
          return images.night.Ash;
        }
        case "Squall": {
          return images.night.Squall;
        }
        case "Tornado": {
          return images.night.Tornado;
        }
        case "Clear": {
          return images.night.Clear;
        }
      }
    }
  }
};
