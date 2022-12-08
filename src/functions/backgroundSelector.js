import CloudsDay from "/img/Clouds-day.jpg";
import ThunderstormDay from "/img/Thunderstorm-day.jpg";
import DrizzleDay from "/img/Drizzle-day.jpg";
import RainDay from "/img/Rain-day.jpg";
import SnowDay from "/img/Snow-day.jpg";
import MistDay from "/img/Mist-day.jpg";
import SmokeDay from "/img/Smoke-day.jpg";
import HazeDay from "/img/Haze-day.jpg";
import DustDay from "/img/Dust-day.jpg";
import FogDay from "/img/Fog-day.jpg";
//exception
import SandDay from "/img/Dust-day.jpg";
//exception
import AshDay from "/img/Smoke-day.jpg";
//exception
import SquallDay from "/img/Thunderstorm-day.jpg";
import TornadoDay from "/img/Tornado-day.jpg";
import ClearDay from "/img/Clear-day.jpg";

// //Currently night pics using day pics
import CloudsNight from "/img/Clouds-night.jpg";
import ThunderstormNight from "/img/Thunderstorm-day.jpg";
import DrizzleNight from "/img/Drizzle-night.jpg";
import RainNight from "/img/Rain-night.jpg";
import SnowNight from "/img/Snow-night.jpg";
import MistNight from "/img/Mist-day.jpg";
import SmokeNight from "/img/Smoke-day.jpg";
import HazeNight from "/img/Haze-day.jpg";
import DustNight from "/img/Dust-day.jpg";
import FogNight from "/img/Fog-night.jpg";
//exception
import SandNight from "/img/Dust-day.jpg";
//exception
import AshNight from "/img/Smoke-day.jpg";
//exception
import SquallNight from "/img/Thunderstorm-day.jpg";
import TornadoNight from "/img/Tornado-day.jpg";
import ClearNight from "/img/Clear-night.jpg";

const images = {
  day: {
    Clouds: CloudsDay,
    Thunderstorm: ThunderstormDay,
    Drizzle: DrizzleDay,
    Rain: RainDay,
    Snow: SnowDay,
    Mist: MistDay,
    Smoke: SmokeDay,
    Haze: HazeDay,
    Dust: DustDay,
    Fog: FogDay,
    Sand: SandDay,
    Ash: AshDay,
    Squall: SquallDay,
    Tornado: TornadoDay,
    Clear: ClearDay,
  },
  night: {
    Clouds: CloudsNight,
    Thunderstorm: ThunderstormNight,
    Drizzle: DrizzleNight,
    Rain: RainNight,
    Snow: SnowNight,
    Mist: MistNight,
    Smoke: SmokeNight,
    Haze: HazeNight,
    Dust: DustNight,
    Fog: FogNight,
    Sand: SandNight,
    Ash: AshNight,
    Squall: SquallNight,
    Tornado: TornadoNight,
    Clear: ClearNight,
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
