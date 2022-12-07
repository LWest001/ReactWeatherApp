import CloudsDay from "/src/img/Clouds-day.jpg";
import ThunderstormDay from "/src/img/Thunderstorm-day.jpg";
import DrizzleDay from "/src/img/Drizzle-day.jpg";
import RainDay from "/src/img/Rain-day.jpg";
import SnowDay from "/src/img/Snow-day.jpg";
import MistDay from "/src/img/Mist-day.jpg";
import SmokeDay from "/src/img/Smoke-day.jpg";
import HazeDay from "/src/img/Haze-day.jpg";
import DustDay from "/src/img/Dust-day.jpg";
import FogDay from "/src/img/Fog-day.jpg";
//exception
import SandDay from "/src/img/Dust-day.jpg";
//exception
import AshDay from "/src/img/Smoke-day.jpg";
//exception
import SquallDay from "/src/img/Thunderstorm-day.jpg";
import TornadoDay from "/src/img/Tornado-day.jpg";
import ClearDay from "/src/img/Clear-day.jpg";

// //Currently night pics using day pics
import CloudsNight from "/src/img/Clouds-day.jpg";
import ThunderstormNight from "/src/img/Thunderstorm-day.jpg";
import DrizzleNight from "/src/img/Drizzle-day.jpg";
import RainNight from "/src/img/Rain-day.jpg";
import SnowNight from "/src/img/Snow-day.jpg";
import MistNight from "/src/img/Mist-day.jpg";
import SmokeNight from "/src/img/Smoke-day.jpg";
import HazeNight from "/src/img/Haze-day.jpg";
import DustNight from "/src/img/Dust-day.jpg";
import FogNight from "/src/img/Fog-day.jpg";
//exception
import SandNight from "/src/img/Dust-day.jpg";
//exception
import AshNight from "/src/img/Smoke-day.jpg";
//exception
import SquallNight from "/src/img/Thunderstorm-day.jpg";
import TornadoNight from "/src/img/Tornado-day.jpg";
import ClearNight from "/src/img/Clear-day.jpg";

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
