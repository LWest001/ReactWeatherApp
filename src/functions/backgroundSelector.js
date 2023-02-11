import CloudsDay from "../assets/img/bg/Clouds-day.jpg";
import ThunderstormDay from "../assets/img/bg/Thunderstorm-day.jpg";
import DrizzleDay from "../assets/img/bg/Drizzle-day.jpg";
import RainDay from "../assets/img/bg/Rain-day.jpg";
import SnowDay from "../assets/img/bg/Snow-day.jpg";
import MistDay from "../assets/img/bg/Mist-day.jpg";
import SmokeDay from "../assets/img/bg/Smoke-day.jpg";
import HazeDay from "../assets/img/bg/Haze-day.jpg";
import DustDay from "../assets/img/bg/Dust-day.jpg";
import FogDay from "../assets/img/bg/Fog-day.jpg";
//exception
import SandDay from "../assets/img/bg/Dust-day.jpg";
//exception
import AshDay from "../assets/img/bg/Smoke-day.jpg";
//exception
import SquallDay from "../assets/img/bg/Thunderstorm-day.jpg";
import TornadoDay from "../assets/img/bg/Tornado-day.jpg";
import ClearDay from "../assets/img/bg/Clear-day.jpg";

// //Currently night pics using day pics
import CloudsNight from "../assets/img/bg/Clouds-night.jpg";
import ThunderstormNight from "../assets/img/bg/Thunderstorm-day.jpg";
import DrizzleNight from "../assets/img/bg/Drizzle-night.jpg";
import RainNight from "../assets/img/bg/Rain-night.jpg";
import SnowNight from "../assets/img/bg/Snow-night.jpg";
import MistNight from "../assets/img/bg/Mist-day.jpg";
import SmokeNight from "../assets/img/bg/Smoke-day.jpg";
import HazeNight from "../assets/img/bg/Haze-day.jpg";
import DustNight from "../assets/img/bg/Dust-day.jpg";
import FogNight from "../assets/img/bg/Fog-night.jpg";
//exception
import SandNight from "../assets/img/bg/Dust-day.jpg";
//exception
import AshNight from "../assets/img/bg/Smoke-day.jpg";
//exception
import SquallNight from "../assets/img/bg/Thunderstorm-day.jpg";
import TornadoNight from "../assets/img/bg/Tornado-day.jpg";
import ClearNight from "../assets/img/bg/Clear-night.jpg";

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
