import CloudsDay from "../assets/img/Clouds-day.jpg";
import MistDay from "../assets/img/Mist-day.jpg";

const images = {
  day: {
    Clouds: CloudsDay,
    Thunderstorm: "./assets/img/Thunderstorm-day.jpg",
    Drizzle: "./assets/img/Drizzle-day.jpg",
    Rain: "./assets/img/Rain-day.jpg",
    Snow: "./assets/img/Snow-day.jpg",
    Mist: MistDay,
    Smoke: "./assets/img/Smoke-day.jpg",
    Haze: "./assets/img/Haze-day.jpg",
    Dust: "./assets/img/Dust-day.jpg",
    Fog: "./assets/img/Fog-day.jpg",
    Sand: "./assets/img/Sand-day.jpg",
    Ash: "./assets/img/Ash-day.jpg",
    Squall: "./assets/img/Squall-day.jpg",
    Tornado: "./assets/img/Tornado-day.jpg",
    Clear: "./assets/img/Clear-day.jpg",
  },
  night: {
    Clouds: "./assets/img/Clouds-night.jpg",
    Thunderstorm: "./assets/img/Thunderstorm-night.jpg",
    Drizzle: "./assets/img/Drizzle-night.jpg",
    Rain: "./assets/img/Rain-night.jpg",
    Snow: "./assets/img/Snow-night.jpg",
    Mist: "./assets/img/Mist-night.jpg",
    Smoke: "./assets/img/Smoke-night.jpg",
    Haze: "./assets/img/Haze-night.jpg",
    Dust: "./assets/img/Dust-night.jpg",
    Fog: "./assets/img/Fog-night.jpg",
    Sand: "./assets/img/Sand-night.jpg",
    Ash: "./assets/img/Ash-night.jpg",
    Squall: "./assets/img/Squall-night.jpg",
    Tornado: "./assets/img/Tornado-night.jpg",
    Clear: "./assets/img/Clear-night.jpg",
  },
};

export const backgroundSelector = (weather, daySegment) => {
  switch (daySegment) {
    case "d": {
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
    case "n": {
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
