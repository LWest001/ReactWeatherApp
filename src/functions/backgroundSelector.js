import CloudsDay from "../img/Clouds-day.jpg?url";
import ThunderstormDay from "../img/Thunderstorm-day.jpg?url";
import DrizzleDay from "../img/Drizzle-day.jpg?url";
import RainDay from "../img/Rain-day.jpg?url";
import SnowDay from "../img/Snow-day.jpg?url";
import MistDay from "../img/Mist-day.jpg?url";
import SmokeDay from "../img/Smoke-day.jpg?url";
import HazeDay from "../img/Haze-day.jpg?url";
import DustDay from "../img/Dust-day.jpg?url";
import FogDay from "../img/Fog-day.jpg?url";
import SandDay from "../img/Dust-day.jpg?url"; //exception
import AshDay from "../img/Smoke-day.jpg?url"; //exception
import SquallDay from "../img/Thunderstorm-day.jpg?url"; //exception
import TornadoDay from "../img/Tornado-day.jpg?url";
import ClearDay from "../img/Clear-day.jpg?url";

// //Currently night pics using day pics
import CloudsNight from "../img/Clouds-day.jpg?url";
import ThunderstormNight from "../img/Thunderstorm-day.jpg?url";
import DrizzleNight from "../img/Drizzle-day.jpg?url";
import RainNight from "../img/Rain-day.jpg?url";
import SnowNight from "../img/Snow-day.jpg?url";
import MistNight from "../img/Mist-day.jpg?url";
import SmokeNight from "../img/Smoke-day.jpg?url";
import HazeNight from "../img/Haze-day.jpg?url";
import DustNight from "../img/Dust-day.jpg?url";
import FogNight from "../img/Fog-day.jpg?url";
import SandNight from "../img/Dust-day.jpg?url"; //exception
import AshNight from "../img/Smoke-day.jpg?url"; //exception
import SquallNight from "../img/Thunderstorm-day.jpg?url"; //exception
import TornadoNight from "../img/Tornado-day.jpg?url";
import ClearNight from "../img/Clear-day.jpg?url";

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
