import ClearDay from "../assets/img/bg/Clear-day.jpg";
import ClearNight from "../assets/img/bg/Clear-night.jpg";
import CloudsDay from "../assets/img/bg/Clouds-day.jpg";
import CloudsNight from "../assets/img/bg/Clouds-night.jpg";
import DustDay from "../assets/img/bg/Dust-day.jpg";
import DustNight from "../assets/img/bg/Dust-night.jpg";
import DrizzleDay from "../assets/img/bg/Drizzle-day.jpg";
import DrizzleNight from "../assets/img/bg/Drizzle-night.jpg";
import FogDay from "../assets/img/bg/Fog-day.jpg";
import FogNight from "../assets/img/bg/Fog-night.jpg";
import HazeDay from "../assets/img/bg/Haze-day.jpg";
import HazeNight from "../assets/img/bg/Haze-night.jpg";
import MistDay from "../assets/img/bg/Mist-day.jpg";
import MistNight from "../assets/img/bg/Mist-night.jpg";
import RainDay from "../assets/img/bg/Rain-day.jpg";
import RainNight from "../assets/img/bg/Rain-night.jpg";
import SmokeDay from "../assets/img/bg/Smoke-day.jpg";
import SmokeNight from "../assets/img/bg/Smoke-night.jpg";
import SnowDay from "../assets/img/bg/Snow-day.jpg";
import SnowNight from "../assets/img/bg/Snow-night.jpg";
import ThunderstormDay from "../assets/img/bg/Thunderstorm-day.jpg";
import TornadoDay from "../assets/img/bg/Tornado-day.jpg";
import TornadoNight from "../assets/img/bg/Tornado-night.jpg";

const images = {
  d: {
    Clear: ClearDay,
    Clouds: CloudsDay,
    Drizzle: DrizzleDay,
    Dust: DustDay,
    Fog: FogDay,
    Haze: HazeDay,
    Mist: MistDay,
    Rain: RainDay,
    Snow: SnowDay,
    Smoke: SmokeDay,
    Thunderstorm: ThunderstormDay,
    Tornado: TornadoDay,
    // Fallback pic used
    Ash: SmokeDay,
    Sand: DustDay,
    Squall: SnowDay,
  },
  n: {
    Clear: ClearNight,
    Clouds: CloudsNight,
    Drizzle: DrizzleNight,
    Dust: DustNight,
    Fog: FogNight,
    Haze: HazeNight,
    Mist: MistNight,
    Rain: RainNight,
    Smoke: SmokeNight,
    Snow: SnowNight,
    Tornado: TornadoNight,
    // Fallback pic used
    Ash: SmokeNight,
    Sand: DustNight,
    Squall: SnowNight,
    Thunderstorm: ThunderstormDay,
  },
};

export function backgroundSelector(weather, daySegment) {
  return images[daySegment][weather];
}
